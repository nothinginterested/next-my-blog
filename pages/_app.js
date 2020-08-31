import 'styles/globals.css'
import 'styles/css_reset.css'
import React from "react";
import "react-mde/lib/styles/css/react-mde-all.css";
import App from 'next/app'
import {GetServerSideProps, GetServerSidePropsContext} from "next";
import {withSession} from "../lib/withSession";
import 'github-markdown-css'

function MyApp({Component, pageProps, props}) {
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

MyApp.getInitialProps =
  async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    return {...appProps}
  }


