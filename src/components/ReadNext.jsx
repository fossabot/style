/* @flow */
import React, { Component } from 'react'
import { Link } from 'react-router'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'

type Props = {
  post: Object,
  pages: [],
  prefixLink: Function
}

export class ReadNext extends Component {
  props: Props
  render () {
    const { pages, post, prefixLink } = this.props
    const { readNext } = post
    let nextPost
    if (readNext) {
      nextPost = find(pages, (page) =>
        includes(page.path, readNext)
      )
    }
    if (!nextPost) {
      return React.createElement('noscript', null)
    }
    nextPost = find(pages, (page) =>
      includes(page.path, readNext.slice(1, -1))
    )
    // Create pruned version of the body.
    const html = nextPost.data.body
    const body = prune(html.replace(/<[^>]*>/g, ''), 200)

    return (
      <div>
        <h6>
          READ THIS NEXT:
        </h6>
        <h3>
          <Link
            to={{
              pathname: prefixLink(nextPost.path),
              query: {
                readNext: true
              }
            }}>
            {nextPost.data.title}
          </Link>
        </h3>
        <p>{body}</p>
        <hr />
      </div>
    )
  }
}