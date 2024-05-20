export const downloadImageOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{'text': 'download image', callback_data: '/download_image'}],
    ]
  })
}