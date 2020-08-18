import Head from 'next/head'
import styles from 'styles/Home.module.css'
import png from 'asserts/images/Pasted Graphic.png'
import * as React from 'react';

export default function Home() {
  return (
    <div>
      <img src={png} alt=""/>
    </div>
  );
}
