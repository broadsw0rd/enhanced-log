log.mixin({
	muted: {
		styles: {
			color: '#777'
		}
	}
})

log.huge('Enhanced Log')
log.small.muted(log.utils.divider('.', 100))
log.callout.muted('Amazing, flexible, extendable wrapper for console.log')