import { AlarmMode, RingApiOptions } from '../api'
import { readFileSync, writeFileSync } from 'fs'

export interface RingPlatformConfig extends RingApiOptions {
  alarmOnEntryDelay?: boolean
  beamDurationSeconds?: number
  hideLightGroups?: boolean
  hideDoorbellSwitch?: boolean
  hideCameraMotionSensor?: boolean
  sendCameraMotionNotificationsToTv?: boolean
  hideCameraSirenSwitch?: boolean
  hideInHomeDoorbellSwitch?: boolean
  hideAlarmSirenSwitch?: boolean
  hideUnsupportedServices?: boolean
  hideDeviceIds?: string[]
  onlyDeviceTypes?: string[]
  showPanicButtons?: boolean
  nightModeBypassFor: AlarmMode
  ffmpegPath?: string
}

export function updateHomebridgeConfig(
  homebridge: any,
  update: (config: string) => string
) {
  const configPath = homebridge.user.configPath(),
    config = readFileSync(configPath).toString(),
    updatedConfig = update(config)

  if (config !== updatedConfig) {
    writeFileSync(configPath, updatedConfig)
    return true
  }

  return false
}
