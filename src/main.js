import { HTML5Video, Events, Log, Playback, PlayerError } from '@clappr/core'
import flvjs from 'flv.js'

const MIMETYPES = ['video/flv', 'video/x-flv']
const EXTENSION = 'flv'

export default class FLVJSPlayback extends HTML5Video {
  get name () {
    return 'flvjs'
  }

  get supportedVersion () {
    // eslint-disable-next-line no-undef
    return { min: CLAPPR_CORE_VERSION }
  }

  get isHTML5Video () {
    return true
  }

  get flvjs () {
    return this._player
  }

  getPlaybackType () {
    return this._playbackType
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

  // skipping setup `setupSrc` on tag video
  _setupSrc () { }

  _setup () {
    this._destroy()

    const mediaDataSource = {
      type: EXTENSION,
      url: this.options.src
    }
    const flvjsConfig = this.options.playback.flvjsConfig || {}
    this._playbackType = flvjsConfig.isLive ? Playback.LIVE : Playback.VOD

    const enableLogging = flvjsConfig.enableLogging || false
    flvjs.LoggingControl.enableAll = enableLogging

    this._player = flvjs.createPlayer(mediaDataSource, flvjsConfig)
    this._player.on(flvjs.Events.ERROR, this._onError.bind(this))
    this._player.attachMediaElement(this.el)
    this._player.load()
  }

  _onError (type, details, data) {
    Log.error(`flvjs: ${type}: ${details}`, data)

    const formattedError = this.createError({
      code: data.code || type,
      description: data.msg || details,
      raw: data,
      level: PlayerError.Levels.FATAL
    })

    this.trigger(Events.PLAYBACK_ERROR, formattedError)
    this.stop()
  }

  _destroy () {
    if (!this._player) {
      return
    }

    this._player.destroy()
    delete this._player
  }
}

FLVJSPlayback.canPlay = (resource, mimeType = '') => {
  const resourceParts = (resource.split('?')[0].match(/.*\.(.*)$/) || [])
  const isFLV = ((resourceParts.length > 1 && resourceParts[1].toLowerCase() === EXTENSION) ||
    MIMETYPES.indexOf(mimeType) !== -1)
  return flvjs.isSupported() && isFLV
}

// eslint-disable-next-line no-undef
FLVJSPlayback.version = () => VERSION
