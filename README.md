touchclient
===========

Sencha Touch Client

Build instructions:

Prerequisites:

    Sencha-Touch SDK 2.0.x
    java
    rsync
    make and some standard unix coreutils (cat, tar, sed, cp, rm)

For generating missing files after initial checkout, please run:

    make missing

For building a tar archive which can be deployed in any web server, run:

    make SDK=/path/to/secha-touch-sdk dist
