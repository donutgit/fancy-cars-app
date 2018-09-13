import React from 'react';
import { Parallax } from 'react-spring';
import classes from './SpringSlider.css';

const Page = ({ offset, caption, first, second, gradient, onClick }) => (
  <React.Fragment>
    <Parallax.Layer offset={offset} speed={0.2} onClick={onClick}>
      <div className={classes.slopeBegin} />
    </Parallax.Layer>

    <Parallax.Layer offset={offset} speed={-0.2} onClick={onClick}>
      <div className={[classes.slopeEnd, classes[gradient]].join(' ')} />
    </Parallax.Layer>

    <Parallax.Layer className={[classes.text, classes.number].join(' ')} offset={offset} speed={0.3}>
      <span>0{offset + 1}</span>
    </Parallax.Layer>

    <Parallax.Layer className={[classes.text, classes.header].join(' ')} offset={offset} speed={0.4}>
      <span>
        <p style={{ fontSize: "20px" }}>{caption}</p>
        <div className={[classes.stripe, classes[gradient]].join(' ')} />
        <p>{first}</p>
        <p>{second}</p>
      </span>
    </Parallax.Layer>
  </React.Fragment>
)

class SpringSlider extends React.Component {
  scroll = to => this.refs.parallax.scrollTo(to)
  render() {
    return (
      <Parallax className={classes.container} ref="parallax" pages={3} horizontal scrolling={false}>
        <Page offset={0} gradient="pink" caption="who we are" first="Lorem ipsum" second="dolor sit" onClick={() => this.scroll(1)} />
        <Page offset={1} gradient="teal" caption="what we do" first="consectetur" second="adipiscing elit" onClick={() => this.scroll(2)} />
        <Page offset={2} gradient="tomato" caption="what we want" first="Morbi quis" second="est dignissim" onClick={() => this.scroll(0)} />
      </Parallax>
    )
  }
}

export default SpringSlider;
