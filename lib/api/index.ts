import { URLSearchParams } from "url"
import * as models from '../models'

const apiBaseUrl = 'https://jsonplaceholder.typicode.com'

export async function getUsers() {
  const endpoint = `${apiBaseUrl}/users`
  const res = await fetch(endpoint)
  return res.json()
}

export async function getUserById(userId: number) {
  const endpoint = `${apiBaseUrl}/users/${userId}`
  const res = await fetch(endpoint)
  return res.json()
}

export async function getPostsByUserId(userId: number) {
  const endpoint = `${apiBaseUrl}/users/${userId}/posts`
  const res = await fetch(endpoint)
  return res.json()
}

export async function getAlbumsByUserId(userId: number) {
  const endpoint = `${apiBaseUrl}/users/${userId}/albums`
  const res = await fetch(endpoint)
  return res.json()
}

export async function getPhotosByAlbumId(albumId: number) {
  const endpoint = `${apiBaseUrl}/albums/${albumId}/photos`
  const res = await fetch(endpoint)
  return res.json()
}

export async function getCommentsByPostId(postId: number) {
  const endpoint = `${apiBaseUrl}/posts/${postId}/comments`
  const res = await fetch(endpoint)
  return res.json()
}

export async function updatePost(post: models.Post) {
  const endpoint = `${apiBaseUrl}/posts/${post.id}`
  const res = await fetch(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
  return res.json()
}

export async function deletePostById(postId: number) {
  const endpoint = `${apiBaseUrl}/posts/${postId}`
  const res = await fetch(endpoint, {
    method: 'DELETE',
  })
  return res
}

export {}
