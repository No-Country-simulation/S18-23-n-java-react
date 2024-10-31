import { Avatar, Box, Card, CardContent, Typography } from "@mui/material"
import { red } from "@mui/material/colors"

interface Props {
  url: string,
  fullName: string,
  opinion: string,
  occupation: string,
}

const CardTestimony = ({
    url,
    fullName,
    opinion,
    occupation
  }: Props) => {
  return (
    <Card sx={{ maxWidth: 370, height: 350 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin={2}
        >
          <Avatar
            sx={{ bgcolor: red[500], width: 70, height: 70 }}
            aria-label="recipe"
            src={url}
          >
            R
          </Avatar>
        </Box>
        <Box
          margin={3}
        >
          <Typography variant="body1" sx={{ color: 'text.primary' }} align="center">
            "{opinion}"
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          margin={2}
        >
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {fullName}
          </Typography>
          <Typography variant="body2" color="primary">
            {occupation}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardTestimony