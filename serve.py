#!/usr/bin/env python
import os
import SimpleHTTPServer
import SocketServer
os.chdir(os.path.join(os.path.dirname(__file__), 'app'))
PORT = 8000
Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)
print "serving at http://localhost:%d/" % PORT
httpd.serve_forever()

