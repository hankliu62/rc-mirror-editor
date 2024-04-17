import MirrorEditor from '@hankliu/rc-mirror-editor';
import * as React from 'react';


const LanguageDemo = `# encoding:utf-8
import requests
import base64
import cv2
import numpy as np
from PIL import Image

source_folder = 'D:\\Workspace\\personal\\python\\small-tools\\images\\source'
temp_folder = 'D:\\Workspace\\personal\\python\\small-tools\\images\\temp'
dist_folder = 'D:\\Workspace\\personal\\python\\small-tools\\images\\dist'
image_name = 'avatar.png'

def fetch_access_token(client_key, client_secret):
  # client_id 为官网获取的AK， client_secret 为官网获取的SK
  url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=%s&client_secret=%s'%(client_key, client_secret)
  response = requests.get(url)
  if response:
    return response.json().get('access_token')

def portrait_split(access_token):
  url = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg?access_token=%s' % access_token
  # 二进制方式打开图片文件
  f = open('%s\\%s' % (source_folder, image_name), 'rb')
  img = base64.b64encode(f.read())

  params = {'image': img}
  headers = {'content-type': 'application/x-www-form-urlencoded'}
  response = requests.post(url, data=params, headers=headers)

  return response.json()

def download_labelmap_image(labelmap):
  labelmap = base64.b64decode(labelmap)
  nparr = np.frombuffer(labelmap, np.uint8)
  label_img = cv2.imdecode(nparr, 1)
  # width, height为图片原始宽、高
  width = label_img.shape[1]
  height = label_img.shape[0]
  label_img = cv2.resize(label_img, (width, height), interpolation=cv2.INTER_NEAREST)
  im_new = np.where(label_img == 1, 255, label_img)
  cv2.imwrite('%s\\label_%s' % (temp_folder, image_name), im_new)

def download_foreimage(foreground):
  foreimage_url = '%s\\foreground_%s' % (temp_folder, image_name)
  with open(foreimage_url, 'wb') as f:
    f.write(base64.b64decode(foreground))

def download_scoremap_image(scoremap):
  image_score_url = '%s\\score_%s' % (temp_folder, image_name)
  with open(image_score_url, 'wb') as f:
    f.write(base64.b64decode(scoremap))

def combine_image(foreimage, baseimage, rate):
  baseimage_pillow = Image.open(baseimage)
  base_width, base_height = baseimage_pillow.size

  foreimage_pillow = Image.open(foreimage)
  fore_width, fore_height = foreimage_pillow.size

  # 将前景安装指定的比例进行缩放以适应背景大小
  foreimage_pillow = foreimage_pillow.resize((int(fore_width * rate), int(fore_height * rate)))
  fore_width, fore_height = foreimage_pillow.size

  # 分离通道
  r, g, b, a = foreimage_pillow.split()
  box = (int(base_width / 2 - fore_width / 2), base_height - fore_height,
          int(base_width / 2 + fore_width / 2), base_height)

  # 将前景粘贴到背景中
  baseimage_pillow.paste(foreimage_pillow, box, mask=a)

  # 返回粘贴合成好的照片
  return baseimage_pillow


if __name__ == "__main__":
  access_token = fetch_access_token('XCq******hl8Yh****CQ4Na5', 'Qjnecnab*********5ZO78G****4beBE')
  res = portrait_split(access_token)

  download_scoremap_image(res.get('scoremap'))

  download_foreimage(res.get('foreground'))

  download_labelmap_image(res.get('labelmap'))

  baseimage_url = '%s\\bg.jpg' % source_folder
  foreimage_url = '%s\\foreground_%s' % (temp_folder, image_name)
  combined_image_url = '%s\\combined_%s' % (dist_folder, image_name)
  combine_image(foreimage_url, baseimage_url, 10).save(combined_image_url)
`;

export default function Base() {
  const [content, setContent] = React.useState<string>(LanguageDemo)

  return (
    <div>
      <MirrorEditor
        height={400}
        value={content}
        language="python"
        onChange={(val) => {
          setContent(val);
        }}
        theme="abyss"
      />
    </div>
  );
}
