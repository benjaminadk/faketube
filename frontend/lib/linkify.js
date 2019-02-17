import formatHMStoSecs from './formatHMStoSecs'
import formatCategory from './formatCategory'
import { frontend } from '../config'

const reUrl = /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
const reTime = /\s(?:(?:([01]?\d):)?([0-5]?\d))?:([0-5]?\d)\s/g
const reHash = /(?:\s|^)?#[A-Za-z0-9\-\.\_]+(?:\s|$)/g

export default function linkify(video) {
  return (
    video.description
      .replace(reUrl, url => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(reTime, time => {
        const secs = formatHMStoSecs(time)
        if (secs > video.duration) {
          return time
        } else {
          return `<a href="${frontend}/watch?id=${video.id}&t=${formatHMStoSecs(time)}">${time}</a>`
        }
      }) +
    `<div className='category'>
            <div>Category</div>
            <a href="/category?name=${video.category}">${formatCategory(video.category)}</a>
          </div>`
  )
}
