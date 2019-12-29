import React, { useState } from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { Box, Grid, Main } from "grommet"

import Nav from "@components/Nav"
import Sidebar from "@components/Sidebar"

// import appleTouchIcon from "../../static/assets/favicon/apple-touch-icon.png"
// import favicon32 from "../../static/assets/favicon/favicon-32x32.png"
// import favicon16 from "../../static/assets/favicon/favicon-16x16.png"

const StyledSidebarBox = styled(Box)`
  position: sticky; // See link
  top: 0; //to make it stick to the top of the screen
  height: 100vh; // make the height equal to 100 view height
`

const BaseLayout = ({ children, className, title }) => {
  const [sidebar, setSidebar] = useState(true)

  const toggleSidebar = () => setSidebar(!sidebar)

  return (
    <div>
      <Helmet>
        <title>{title || "Gatsby Documentation Starter"}</title>
        {/* <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} /> */}
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>

      <Grid
        fill
        rows={["auto", "flex"]}
        columns={["auto", "flex"]}
        areas={[
          { name: "header", start: [0, 0], end: [1, 0] },
          { name: "sidebar", start: [0, 1], end: [0, 1] },
          { name: "main", start: [1, 1], end: [1, 1] },
        ]}
      >
        <Nav gridArea="header" toggleSidebar={toggleSidebar} />
        {sidebar && (
          <StyledSidebarBox
            gridArea="sidebar"
            background="light-3"
            width="small"
            animation={[
              { type: "fadeIn", duration: 300 },
              { type: "slideRight", size: "xlarge", duration: 150 },
            ]}
          >
            <Sidebar />
          </StyledSidebarBox>
        )}
        <Box gridArea="main" justify="center" align="center">
          <Main className={`App ${className}`}>{children}</Main>
        </Box>
      </Grid>
    </div>
  )
}

export default BaseLayout
