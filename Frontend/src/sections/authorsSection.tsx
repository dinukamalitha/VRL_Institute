"use client"

import { Box, Container, Typography, Avatar } from "@mui/material"

type Author = {
  _id?: string
  name: string
  photo?: string
  description?: string
}

function AuthorCard({ author }: { author: Author }) {
  return (
    <Box sx={{ display: "flex", gap: 3, mb: 5 }}>
      <Avatar
        src={author.photo || ""}
        alt={author.name}
        sx={{ width: 120, height: 150, borderRadius: "8px" }}
      />
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {author.name}
        </Typography>
        {author.description && (
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            {author.description}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default function AuthorsSection({
                                         authors,
                                         isEvent = false
                                       }: {
  authors: Author[]
  isEvent?: boolean
}) {
  if (!authors || authors.length === 0) return null

  return (
    <Container maxWidth="md" sx={{ py: 1 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {isEvent ? "Resource Person/s:" : "Authored by:"}
      </Typography>
      {authors.map((author) => (
        <AuthorCard key={author._id || author.name} author={author} />
      ))}
    </Container>
  )
}
