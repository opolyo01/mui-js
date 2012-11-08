# -*-Makefile-*-
#
#   DO NOT EDIT THIS MAKEFILE.
#
#   If you need to make a change to this makefile, send mail to
#   img-ops@yahoo-inc.com and request it.
#
#   DO NOT EDIT THIS MAKEFILE.
#
# Master Makefile for Image/CSS/JS Pushing.  Used for subdirs:
#
#   i/    - Core, Static Images
#   lib/  - Core, Static CSS/JS
#   a/    - Ads, ad-served content
#
# THIS MAKEFILE PUSHES TO THE IMAGE SERVERS.
#
# [08/03/11 - vanugant]
#  - Create the directory always and remove the .dir dependency
#  - Support for mud hosts are added
#
# [05/16/06 - rtroll]
#  - Special case redundant colo writers; in order to not have
#    multiple rsync processes attempting to update the same NFS server
#    simultaneously
#
# [10/14/05 - rtroll]
#  - Added '.lip' extension, for ads.
#
# [09/20/05 - rtroll]
#  - Pulled together by sampling existing Makefiles
#  - All stamping removed
#  - No longer lowercases files
#
# $Id: Makefile.yimg,v 1.22 2009/03/20 14:16:29 bfrance Exp $
# $Source: /CVSROOT/yahoo/properties/yimg/html.yahoo.com/Makefile.yimg,v $
#
######################################################################

export HOME = /home/yahoo
export SHELL = /usr/local/bin/bash
export PATH += /usr/local/bin/netpbm:/home/yahoo/bin:/bin:/usr/local/bin
export PERLLIB += /home/yahoo/perl
export NOLINT
export NOSYNC
unexport SSH_AGENT_PID
unexport SSH_AUTH_SOCK
unexport SSH_TTY

CP  := cp
SSH := ssh -x -l yahoo -i /etc/ssh/yahoo/identity
SRC := $(subst htdocs.static,htdocs/static,$(shell pwd))
DST := $(subst htdocs/static,htdocs/push,$(SRC))
EXT := html gif txt exe jpeg jpg dcr wrl jar cab class js xml bmp rm ram \
	ra rpm mp3 m3u mp3url mov zip swf css png mts mtx mtz mzv pdf wav \
	ico htc lip xsl flv vbs eot xpi qtl imv dtd psd

RSYNC := rsync-2.3.1 -e '$(SSH)'
TARGETS := $(foreach e, $(EXT), $(foreach f, $(wildcard *.$(e)), $(DST)/$(f)))
MIRRORS := $(shell cat /home/yahoo/mirrors/yimg | grep -v 'i4.img.mud'| grep -v 'i4.img.ac4' | grep -v 'i4.img.sk1')
MIRROR_REDUNDANT_WRITERS = i4.img.mud.yahoo.net i4.img.ac4.yahoo.net i4.img.sk1.yahoo.net
SYNCFILE:= $(SRC)/.sync
DIRFILE:= $(SRC)/.dir

DIRSIZELIMIT = 1024
DIRSIZELIMITURL = "http://twiki.corp.yahoo.com/view/Platform/YCDNContentDist"

all: uid dirsize dircreate $(SYNCFILE)

.PHONY: uid
uid:
	@if [ `id -u -n` != "yahoo" ]; then echo "you must be user 'yahoo' - please run 'sudo -u yahoo bash'"; exit 1; fi

.PHONY: dirsize
dirsize:
	@if [ "$(IGNORE_DIR_SIZELIMIT)x" == "x" ]; then \
	  if [ `ls | wc -l` -gt $(DIRSIZELIMIT) ]; then echo "Please do not put more than $(DIRSIZELIMIT) files in a single directory.  See:"; echo $(DIRSIZELIMITURL); exit 1; fi \
	fi

recurse: all
	@for d in *; do \
		if [ -d $$d -a $$d != RCS ]; then \
			(cd $$d; if [ ! -e Makefile ]; then ln -s ../Makefile; fi; NOSYNC=1 $(MAKE) recurse); \
		fi; \
	done
ifeq ($(MAKELEVEL), 0)
	@for i in $(MIRRORS); do \
		echo syncing $$i; \
		$(RSYNC) -pr $(DST)/ $$i:$(SRC)/ & \
	done; \
	wait
	@for i in $(MIRROR_REDUNDANT_WRITERS); do \
		echo syncing $$i; \
		$(RSYNC) -pr $(DST)/ $$i:$(SRC)/ & \
	done; \
	wait
endif

clean:
	rm -f $(TARGETS) $(SYNCFILE) $(DIRFILE)

$(DIRFILE):
	@for i in $(MIRRORS); do \
		echo mkdir -p $$i:$(SRC); \
		$(SSH) $$i mkdir -p $(SRC) & \
	done; \
	wait
	@for i in $(MIRROR_REDUNDANT_WRITERS); do \
		echo mkdir -p $$i:$(SRC); \
		$(SSH) $$i mkdir -p $(SRC) & \
	done; \
	wait
	@touch $@

.PHONY: dircreate
dircreate:
	@for i in $(MIRRORS); do \
		$(SSH) $$i mkdir -p $(SRC) & \
	done; \
	wait
	@for i in $(MIRROR_REDUNDANT_WRITERS); do \
		$(SSH) $$i mkdir -p $(SRC) & \
	done; \
	wait

$(SYNCFILE): $(TARGETS)
	@rm -f $@
ifneq ($(NOSYNC), 1)
	@echo syncing:
	@for i in $(MIRRORS); do \
		echo $$i; \
		$(RSYNC) -p $? $$i:$(SRC)/ & \
	done; \
	wait
	@for i in $(MIRROR_REDUNDANT_WRITERS); do \
		echo $$i; \
		$(RSYNC) -p $? $$i:$(SRC)/ & \
	done; \
	wait
endif
	@touch $@

$(DST)/%.html : $(SRC)/%.html
	@echo $<
	@sudo chown yahoo $<
	@chmod a-x,u+w,g+u $<
	@check_filename $@
ifneq ($(NOLINT), 1)
	@weblint -x netscape,microsoft $<
	@weblint -d unknown-attribute,markup-in-comment,img-alt,empty-container,quote-attribute-value -x netscape,microsoft $< > /dev/null 2>&1 || exit 1
endif
	@mkdir -p $(@D)
	@$(CP) -f $< $@
	@chmod g+u $@

$(DST)/%.gif : $(SRC)/%.gif
	@echo $<
	@sudo chown yahoo $<
	@chmod a-x,u+w,g+u $<
	@mkdir -p $(@D)
	@t=`upper_ext $<`; if [ -e $$t ]; then mv $$t $@; exit 0; fi
	@check_filename $@
#ifneq ($(LOOP), 1)
#	@gif89 < $< > $@ 2> /dev/null
#else
#	@$(CP) -f $< $@
#endif
	@$(CP) -f $< $@
#	@stamp $@
	@chmod g+u $@

define default
	@echo $<
	@sudo chown yahoo $<
	@chmod a-x,u+w,g+u,o+r $<
	@mkdir -p $(@D)
	@t=`upper_ext $<`; if [ -e $$t ]; then mv $$t $@; exit 0; fi
	@check_filename $@
	@$(CP) -f $< $@
	@chmod g+u $@
endef

$(DST)/%.txt: $(SRC)/%.txt
	$(default)
$(DST)/%.exe: $(SRC)/%.exe
	$(default)
$(DST)/%.rpm: $(SRC)/%.rpm
	$(default)
$(DST)/%.ram: $(SRC)/%.ram
	$(default)
$(DST)/%.jpeg: $(SRC)/%.jpeg
	$(default)
$(DST)/%.ra: $(SRC)/%.ra
	$(default)
$(DST)/%.rm: $(SRC)/%.rm
	$(default)
$(DST)/%.png: $(SRC)/%.png
	$(default)
$(DST)/%.jpg: $(SRC)/%.jpg
	$(default)
$(DST)/%.dcr: $(SRC)/%.dcr
	$(default)
$(DST)/%.wrl: $(SRC)/%.wrl
	$(default)
$(DST)/%.cab: $(SRC)/%.cab
	$(default)
$(DST)/%.class: $(SRC)/%.class
	$(default)
$(DST)/%.jar: $(SRC)/%.jar
	$(default)
$(DST)/%.js: $(SRC)/%.js
	$(default)
$(DST)/%.xml: $(SRC)/%.xml
	$(default)
$(DST)/%.bmp: $(SRC)/%.bmp
	$(default)
$(DST)/%.mp3: $(SRC)/%.mp3
	$(default)
$(DST)/%.m3u: $(SRC)/%.m3u
	$(default)
$(DST)/%.mp3url: $(SRC)/%.mp3url
	$(default)
$(DST)/%.mov: $(SRC)/%.mov
	$(default)
$(DST)/%.zip: $(SRC)/%.zip
	$(default)
$(DST)/%.swf: $(SRC)/%.swf
	$(default)
$(DST)/%.css: $(SRC)/%.css
	$(default)
$(DST)/%.mts: $(SRC)/%.mts
	$(default)
$(DST)/%.mtx: $(SRC)/%.mtx
	$(default)
$(DST)/%.mtz: $(SRC)/%.mtz
	$(default)
$(DST)/%.mzv: $(SRC)/%.mzv
	$(default)
$(DST)/%.pdf: $(SRC)/%.pdf
	$(default)
$(DST)/%.wav: $(SRC)/%.wav
	$(default)
$(DST)/%.ico: $(SRC)/%.ico
	$(default)
$(DST)/%.htc: $(SRC)/%.htc
	$(default)
$(DST)/%.lip: $(SRC)/%.lip
	$(default)
$(DST)/%.xsl: $(SRC)/%.xsl
	$(default)
$(DST)/%.flv: $(SRC)/%.flv
	$(default)
$(DST)/%.qtl: $(SRC)/%.qtl
	$(default)
$(DST)/%.dtd: $(SRC)/%.dtd
	$(default)
$(DST)/%.vbs: $(SRC)/%.vbs
	$(default)
$(DST)/%.eot: $(SRC)/%.eot
	$(default)
$(DST)/%.xpi: $(SRC)/%.xpi
	$(default)
$(DST)/%.imv: $(SRC)/%.imv
	$(default)
$(DST)/%.psd: $(SRC)/%.psd
	$(default)
