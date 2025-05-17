import type { FileRouter } from "uploadthing/next";
import {generateReactHelpers} from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
export const {useUploadThing} = generateReactHelpers<OurFileRouter>();