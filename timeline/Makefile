BIN_PATH := ./node_modules/expresso/bin
EXPRESSO := $(BIN_PATH)/expresso

JSLINT   := /usr/local/bin/gjslint
FIX_STYLE := /usr/local/bin/fixjsstyle
JSLINT_PARAMS := --exclude_files model.js --custom_jsdoc_tags public,static --recurse lib/

test_service: 
	$(EXPRESSO) --serial test/service.test.js

test_api: 
	$(EXPRESSO) --serial test/api.test.js

jslint: 
	$(JSLINT) $(JSLINT_PARAMS)

fixstyle: 
	$(FIX_STYLE) $(JSLINT_PARAMS)

docs:

benchmark:

install:
	npm install .

uninstall: 
	rm -rf ./node_modules

seed: 
	node scripts/seed.js --environment $(NODE_ENV)

.PHONY: test jslint docs benchmark install uninstall seed fixstyle
