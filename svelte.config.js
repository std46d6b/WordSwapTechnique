import adapter from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            // default options
            out: 'build',
            precompress: false,
            envPrefix: '',
            polyfill: true,
            handleError: (err) => {}
        }),
        csrf: {
            checkOrigin: false,
        }
    }
};

export default config