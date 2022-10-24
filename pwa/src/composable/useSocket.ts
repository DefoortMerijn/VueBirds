// socket.io-client

import { io, Socket } from 'socket.io-client'
import { ref } from 'vue'
import LiveLocation from '../interfaces/interface.live-location'
import useCustomUser from './useCustomUser'
import useGeolocation from './useGeolocation'

const socketServer = ref<Socket>()
const connected = ref<boolean>(false)

export default () => {
  const { startTracking } = useGeolocation()
  const { customUser } = useCustomUser()
  const _connect = () => {
    console.log('connected')
    connected.value = true
    startTracking((p: GeolocationPosition) => {
      const payload: LiveLocation = {
        idUser: customUser.value!.id!,
        geoLocation: {
          type: 'Point',
          coordinates: [p.coords.longitude, p.coords.latitude],
        },
      }
      console.log('payload', payload)

      socketServer.value!.emit('birdspotter:moving', payload)
    })
  }

  const _disconnect = () => {
    console.log('disconnected')
    connected.value = false
  }

  const _error = (error: any) => {
    console.log('error', error)
  }

  const disconnectFromServer = () => {
    if (socketServer.value) {
      socketServer.value.disconnect()
    }
  }

  const connectToServer = () => {
    if (socketServer.value) {
      return
    }

    socketServer.value = io('ws://[::1]:3004', {
      transports: ['websocket'], //polling is default , can give cors errors
    })

    socketServer.value.on('connect', _connect)
    socketServer.value.on('disconnect', _disconnect)
    socketServer.value.on('error', _error)
  }

  return {
    connected,

    connectToServer,
    disconnectFromServer,
  }
}
