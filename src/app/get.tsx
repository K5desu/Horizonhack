type Props = {
  url: string
}

export async function GET(url: Props) {
  return <img src={url.url}></img>
}
