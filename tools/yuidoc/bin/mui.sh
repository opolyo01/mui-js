#!/bin/sh
# The location of your yuidoc install
#yuidoc_home=~/www/yuidoc/yuidoc
#yuidoc_home="../"
yuidoc_home="tools/yuidoc"

# The base directory for the entire src tree
#src_base="../../../src"
src_base="src"

# The location of the files to parse.  Parses subdirectories, but will fail if
# there are duplicate file names in these directories.  You can specify multiple
# source trees:
#     parser_in="%HOME/www/yui/src %HOME/www/event/src"
#parser_in="$HOME/src"
parser_in="$src_base/action-sheet $src_base/datasource $src_base/geo $src_base/loader $src_base/mui $src_base/navigation-bar $src_base/navigator $src_base/pager $src_base/scroll-view $src_base/search-box $src_base/storage $src_base/swipe-view $src_base/tab-view $src_base/transition $src_base/web-app"

# The location to output the parser data.  This output is a file containing a 
# json string, and copies of the parsed files.
#parser_out=~/www/docs/parser
parser_out="/tmp"

# The directory to put the html file outputted by the generator
#generator_out=~/www/docs/generator
#generator_out="../../../api"
generator_out="api"

# The location of the template files.  Any subdirectories here will be copied
# verbatim to the destination directory.
template=$yuidoc_home/template

# The version of your project to display within the documentation.
version=1.0.0

# The version of YUI the project is using.  This effects the output for
# YUI configuration attributes.  This should start with '2' or '3'.
yuiversion=3

# Project title
title="mui"

# Project URL
url=""

# Project description
description="Mobile User Interface"

##############################################################################
# add -s to the end of the line to show items marked private

$yuidoc_home/bin/yuidoc.py $parser_in -p $parser_out -o $generator_out -t $template -v $version -Y $yuiversion -m "$title" -u "$url" -d "$description" -s
