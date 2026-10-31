"""Fail the deploy if generated inline JavaScript lacks an approved CSP hash."""

import base64
import hashlib
from html.parser import HTMLParser
from pathlib import Path
import re
import sys


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.inline = False
        self.source = ""
        self.hashes = set()

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.inline = "src" not in dict(attrs)
            self.source = ""

    def handle_data(self, data):
        if self.inline:
            self.source += data

    def handle_endtag(self, tag):
        if tag == "script" and self.inline:
            digest = hashlib.sha256(self.source.encode()).digest()
            self.hashes.add("sha256-" + base64.b64encode(digest).decode())
            self.inline = False


root = Path(__file__).resolve().parent.parent
config = (root / "netlify.toml").read_text()
policy = re.search(r'^Content-Security-Policy = "(.*)"$', config, re.MULTILINE)
if not policy:
    sys.exit("Missing Content-Security-Policy in netlify.toml")
scripts = re.search(r"(?:^|;)\s*script-src\s+([^;]+)", policy[1])
if not scripts:
    sys.exit("Missing script-src in Content-Security-Policy")
approved = set(re.findall(r"'(sha256-[A-Za-z0-9+/=]+)'", scripts[1]))
output = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "public"
pages = list(output.rglob("*.html"))
if not pages:
    sys.exit(f"No HTML pages found in {output}; build with Hugo first")
failures = []
for page in pages:
    parser = Scripts()
    parser.feed(page.read_text())
    for missing in sorted(parser.hashes - approved):
        failures.append(f"{page}: unapproved inline script '{missing}'")
if failures:
    sys.exit("\n".join(failures))
print(f"CSP inline script hashes verified across {len(pages)} HTML pages")
