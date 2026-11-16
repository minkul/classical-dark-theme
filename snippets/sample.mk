# Sample Makefile covering language tokens.

SHELL := /bin/bash
.DEFAULT_GOAL := help

# ── Variables ──
APP_NAME = theme-sample
VERSION ?= 1.0.0
BUILD_DIR := build
SOURCES := $(wildcard src/*.ts)
OBJECTS := $(patsubst src/%.ts,$(BUILD_DIR)/%.js,$(SOURCES))
CFLAGS += -Wall -O2
export NODE_ENV = production

ifeq ($(OS),Windows_NT)
    RM := del /Q
else
    RM := rm -rf
endif

ifdef DEBUG
    CFLAGS += -g
endif

.PHONY: all build clean test help

## all: Build everything
all: build test

## build: Compile the sources
build: $(OBJECTS)
	@echo "Built $(APP_NAME) v$(VERSION)"

$(BUILD_DIR)/%.js: src/%.ts | $(BUILD_DIR)
	npx tsc $< --outDir $(@D)

$(BUILD_DIR):
	mkdir -p $@

## test: Run the tests
test:
	@for file in $(SOURCES); do \
		echo "Testing $$file"; \
	done

## clean: Remove build artifacts
clean:
	-$(RM) $(BUILD_DIR)

## help: Show this help
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed -e 's/## //'

define greet
	@echo "Hello, $(1)!"
endef

greet:
	$(call greet,World)

include config.mk
