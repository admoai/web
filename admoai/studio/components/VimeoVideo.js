// @ts-nocheck
import {
  Button,
  Card,
  Heading,
  Stack,
  useToast,
  ToastProvider
} from '@sanity/ui'
import last from 'lodash/last'
import React from 'react'
import { set } from 'sanity'
import styled from 'styled-components'

const DetailsText = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 12px;
`

async function handleBadResponse(response) {
  let message = 'Failed to fetch video data'
  let data
  try {
    data = await response.json()
  } catch (e) {
    // ignore body parsing errors
  }
  if (data && data.developer_message) {
    message += `: ${data.developer_message}`
  }
  const error = new Error(message)
  if (data && data.error_code) {
    error.code = data.error_code
  }
  error.status = response.status
  throw error
}

async function transformVimeoId(vimeoId) {
  if (!vimeoId) {
    return null
  }
  const url = `https://api.vimeo.com/videos/${encodeURIComponent(
    vimeoId
  )}?fields=width,height,files,pictures.sizes,name`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer 182b10fafa4ffffd37947953f3c19e4a`
    }
  })
  if (!response.ok) {
    await handleBadResponse(response)
  }
  return await response.json()
}

const getHlsLink = (data) => {
  return data?.files?.filter((x) => x.quality === 'hls')[0].link
}

export default function VimeoVideoInput(props) {
  const toast = useToast()
  const handleClick = async () => {
    const vimeoId = props.value?.vimeoId
    if (vimeoId) {
      toast.push({
        title: 'Fetching video data from Vimeo...'
      })
      try {
        const vimeoData = await transformVimeoId(vimeoId)
        if (vimeoData) {
          toast.push({ status: 'success', title: 'Success!' })
          const thumb = last(vimeoData?.pictures?.sizes)
          props.onChange(
            set({
              ...props.value,
              title: vimeoData?.name,
              hlsPlayerLink: getHlsLink(vimeoData),
              width: vimeoData.width,
              height: vimeoData.height,
              vimeoThumbnail: {
                ...thumb
              }
            })
          )
        }
      } catch (e) {
        toast.push({ status: 'error', title: e.message })
      }
    }
  }

  return (
    <ToastProvider>
      <Stack space={[1, 1, 2]}>
        {props.renderDefault(props)}
        <Button
          padding={[2, 4, 2]}
          onClick={handleClick}
          aria-label='Fetch Vimeo Data'
        >
          Fetch Vimeo Data
        </Button>

        {props?.value?.hlsPlayerLink && (
          <Stack space={[1, 1, 2]} style={{ marginTop: 20 }}>
            <Heading as='h4' size={0}>
              Vimeo Data
            </Heading>
            <Card padding={2} tone='primary' radius={2} shadow={1}>
              <Detail value={props.value.title} title='Title' />
              <Detail value={props.value.hlsPlayerLink} title='HLS Link' />
              {props?.value?.vimeoThumbnail?.link && (
                <img
                  src={props.value.vimeoThumbnail.link}
                  width='100%'
                  height='auto'
                />
              )}
            </Card>
          </Stack>
        )}
      </Stack>
    </ToastProvider>
  )
}

function Detail({ value, title }) {
  if (!value) return null
  return (
    <DetailsText size={1}>
      {title}: <b>{value}</b>
    </DetailsText>
  )
}
