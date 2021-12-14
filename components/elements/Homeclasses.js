import styles from '../../styles/Home.module.css'

export default function Homeclasses (){
    return (
        <div className={style.homeclasses}>
            <Container>
    <Row>
    <Col xs={6} md={4}>
      <Image src="/classes/zumba.png" rounded />
    </Col>
    <Col xs={6} md={4}>
      <Image src="/classes/lift.png" rounded />
    </Col>
    <Col xs={6} md={4}>
      <Image src="/classes/tutorial.png" rounded />
    </Col>
  </Row>
</Container>
        </div>
    )
}