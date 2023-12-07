// import { createClient } from "next-sanity";
// import createImageUrlBuilder from "@sanity/image-url";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-07'

export const dataset = assertValue(
  "production",
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  "lstrvpxx",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

