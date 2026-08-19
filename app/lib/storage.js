import { supabase } from "./supabaseClient";

// Uploads a local file (from expo-document-picker or expo-image-picker) to
// the `documents` Storage bucket and returns the storage path to save on
// the owning row (reservations.prescription_doc_url,
// delivery_agents.id_document_url / license_document_url).
//
// fetch(localUri).blob() is the standard way to read a local file: URI in
// Expo's managed workflow — works for both the document picker and image
// picker's returned `uri`.
export async function uploadDocumentAsync({ localUri, folder, fileName, contentType }) {
  const response = await fetch(localUri);
  const blob = await response.blob();
  const arrayBuffer = await new Response(blob).arrayBuffer();

  const path = `${folder}/${Date.now()}_${fileName}`;
  const { error } = await supabase.storage
    .from("documents")
    .upload(path, arrayBuffer, { contentType: contentType || blob.type || "application/octet-stream" });

  if (error) throw error;
  return path;
}

// Prescription review / document approval screens need a temporary signed
// URL to actually display the file (the bucket is private).
export async function getSignedDocumentUrl(path, expiresInSeconds = 600) {
  if (!path) return null;
  const { data, error } = await supabase.storage.from("documents").createSignedUrl(path, expiresInSeconds);
  if (error) {
    console.warn("Could not sign document URL:", error.message);
    return null;
  }
  return data.signedUrl;
}
