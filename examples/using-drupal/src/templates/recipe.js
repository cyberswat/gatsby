import { graphql } from "gatsby"
import React from "react"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Img from "gatsby-image"

import Layout from "../layouts"
import Container from "../components/container"
import { rhythm } from "../utils/typography"
import constants from "../utils/constants"

const RecipeTemplate = ({ data }) => (
  <Layout>
    {console.log(JSON.stringify(data.nodeRecipe.relationships.field_recipe_category[0].name))}
    <div
      css={{
        background: constants.paleYellow,
        padding: rhythm(1.5),
        paddingTop: 0,
        marginBottom: rhythm(3),
      }}
    >
      <Container>
        <h1>{data.nodeRecipe.title}</h1>
        <p>
          <strong>Category: </strong>
          {data.nodeRecipe.relationships.field_recipe_category[0].name}
        </p>
        <div
          css={{
            display: `flex`,
            justifyContent: `space-between`,
            marginBottom: rhythm(2),
          }}
        >
          <div css={{ width: `calc(1/2*100% - (1 - 1/2) * ${rhythm(2)})` }}>
            <Img
              fluid={
                data.nodeRecipe.relationships.field_image.localFile.childImageSharp.fluid
              }
            />
          </div>
          <div css={{ width: `calc(1/2*100% - (1 - 1/2) * ${rhythm(2)})` }}>
            <div>
              <strong>Preparation time:</strong>
            </div>
            <div>{data.nodeRecipe.field_preparation_time} minutes</div>
            <div>
              <strong>Cooking time:</strong>
            </div>
            <div>{data.nodeRecipe.field_cooking_time} minutes</div>
            <div>
              <strong>Difficulty:</strong>
            </div>
            <div>{data.nodeRecipe.field_difficulty}</div>
          </div>
        </div>
        <div css={{ background: `white`, padding: rhythm(1.5) }}>
          <h2>What {`you'll`} need and how to make this dish</h2>
          <div css={{ display: `flex`, justifyContent: `space-between` }}>
            <div css={{ width: `calc(1/2*100% - (1 - 1/2) * ${rhythm(1.5)})` }}>
              <h3>Ingredients</h3>
              <ul>
                {data.nodeRecipe.field_ingredients &&
                  data.nodeRecipe.field_ingredients.map((ing, index) => (
                    <li key={index}>{ing}</li>
                  ))}
              </ul>
            </div>
            <div css={{ width: `calc(1/2*100% - (1 - 1/2) * ${rhythm(1.5)})` }}>
              <h3>Method</h3>
              <ul>
                {data.nodeRecipe.field_recipe_instruction.processed &&
                  ReactHtmlParser(data.nodeRecipe.field_recipe_instruction.processed)
                }
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </Layout>
)

export default RecipeTemplate

export const query = graphql`
  query($slug: String!) {
    nodeRecipe(path: { alias: { eq: $slug } }) {
      title
      field_preparation_time
      field_difficulty
      # totalTime
      field_cooking_time
      field_ingredients
      # instructions
      field_recipe_instruction {
        processed
        value
      }
      relationships {
        field_recipe_category {
          name
        }
        field_image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 740, maxHeight: 555) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
