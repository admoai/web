import { defineCliConfig } from 'sanity/cli'
import { transformWithEsbuild } from 'vite'
import { dataset, projectId } from './studio/env'

export default defineCliConfig({
  studioHost: 'admoai',
  api: {
    projectId,
    dataset
  },
  vite: (config) => {
    config.plugins = [
      {
        name: 'load+transform-js-files-as-jsx',
        enforce: 'pre',
        async transform(code, id) {
          if (!id.match(/studio\/.*\.js$/)) {
            return null
          }

          // Use the exposed transform from vite, instead of directly
          // transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic'
          })
        }
      },
      ...config.plugins
    ]
    config.optimizeDeps = {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        }
      }
    }
    return config
  }
})
