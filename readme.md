# Wabid
A node module to aid in dependency managment for Web Appbuilder projects, by identifying whether a dependency is a WAB widget and should be placed in the `/widgets` directory, or another dependency (i.e., third-party library, dojo dijit) which should go in `/libs`.

Currently implemented as a set of file checks; by default, any directory which contains both `Widget.js` and `manifest.json` will be considered a WAB widget.  The caller can also pass in a custom list of files to test against.
