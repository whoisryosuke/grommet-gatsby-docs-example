import React from "react"
import { Anchor, Box, Button, Text } from "grommet"
import { Grommet as GrommetIcon } from "grommet-icons"

interface Props {
  gridArea: string
}

const Nav: React.FC<Props> = ({ gridArea }) => {
  return (
    <Box
      gridArea={gridArea}
      direction="row"
      justify="between"
      align="center"
      width="100%"
      alignSelf="center"
      gap="medium"
      margin={{ top: "small" }}
      pad="small"
    >
      <Anchor
        href="/"
        icon={<GrommetIcon size="large" />}
        label={<Text size="xlarge">grommet</Text>}
      />
      <Box direction="row" gap="small">
        <Button href="/components" plain>
          {({ hover }) => (
            <Box
              pad={{ vertical: "small", horizontal: "medium" }}
              round="xlarge"
              background={hover ? "active" : "accent-1"}
            >
              <Text>components</Text>
            </Box>
          )}
        </Button>
      </Box>
    </Box>
  )
}

export default Nav
