import { HTML5Video, Events, Log, Playback } from 'clappr'
import flvjs from 'flv.js'

const MIMETYPES = ['video/flv', 'video/x-flv']
const EXTENSION = 'flv'

class FLVJSPlayback extends HTML5Video {
  get name () {
    return 'flvjs_playback'
  }

  get isHTML5Video () {
    return true
  }

  get flvjs () {
    return this._player
  }

  static get version () {
    return VERSION // eslint-disable-line
  }

  static canPlay (resource, mimeType = '') {
    const resourceParts = (resource.split('?')[0].match(/.*\.(.*)$/) || [])
    const isFLV = ((resourceParts.length > 1 && resourceParts[1].toLowerCase() === EXTENSION) ||
                    MIMETYPES.indexOf(mimeType) !== -1)
    return flvjs.isSupported() && isFLV
  }

  constructor (options) {
    super(options)
    options.autoPlay && this.play()
  }

  // skipping setup `setupSrc` on tag video
  _setupSrc () {}

  _setup () {
    const mediaDataSource = {
      type: EXTENSION,
      url: this.options.src
    }
    const flvjsConfig = this.options.playback.flvjsConfig || {}
    this._isLive = flvjsConfig.isLive || false
    this._player = flvjs.createPlayer(mediaDataSource, flvjsConfig)
    this._player.on(flvjs.Events.ERROR, this._onError.bind(this))
    this._player.attachMediaElement(this.el)
    this._player.load()
  }

  _onError (type, details, data) {
    Log.error(`flvjs: ${type}: ${details}`, data)
    this.trigger(Events.PLAYBACK_ERROR, { type, details, data }, this.name)
  }

  _destroy () {
    if (!this._player) {
      return
    }

    this._player.destroy()
    delete this._player
  }

  getPlaybackType () {
    return (this.isReady && this._isLive ? Playback.LIVE : Playback.VOD)
  }

  play () {
    !this._player && this._setup()
    super.play()
  }

  stop () {
    super.stop()
    this._destroy()
  }

  destroy () {
    this._destroy()
    super.destroy()
  }
}

export default FLVJSPlayback
