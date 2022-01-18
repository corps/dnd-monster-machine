define find_updated_sources
$(shell find -type f ! -path "*.marker" ! -path '*/node_modules/*' -printf "%T+ %p\n" | sort | tail -1 | cut -d ' ' -f2)
endef

run: image.marker
	docker run --rm -it dndmm

image.marker: $(call find_updated_sources)
	docker build --rm --tag dndmm .
	touch image.marker
