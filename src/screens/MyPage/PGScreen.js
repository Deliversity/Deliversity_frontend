import React from 'react';
/* 아임포트 모듈을 불러옵니다. */
import IMP from 'iamport-react-native';
import {IAMPORT_CODE} from '../../../env/development';
import axios from '../../axiosConfig';
function Payment(props) {
  //this.props.navigation.navigate
  /* [필수입력] 결제 종료 후, 라우터를 변경하고 결과를 전달합니다. */
  function callback(response) {
    console.log(response);
    if (response.imp_success === 'true') {
      let data = {
        point: props.route.params.chargeAmount,
        imp_uid: response.imp_uid,
        merchant_uid: response.merchant_uid,
      };
      axios
        .post('/api/v1/point', data)
        .then((res) => {
          alert('포인트 충전이 완료 되었습니다.');
        })
        .catch((e) => {
          alert('포인트 충전이 실패되었습니다. ' + e.response.data.message);
        });
    } else {
      alert(response.error_msg);
    }
    props.navigation.goBack(null);
  }

  /* [필수입력] 결제에 필요한 데이터를 입력합니다. */
  const data = {
    pg: 'inicis',
    pay_method: 'card',
    name: '아임포트 결제데이터 분석',
    merchant_uid: `mid_${new Date().getTime()}`,
    // amount: props.amount,
    // buyer_name: props.name,
    // buyer_tel: props.phone,
    amount: props.route.params.chargeAmount,
    buyer_name: props.route.params.buyerName,
    buyer_tel: props.route.params.buyerTel,
    // buyer_email: 'iamport@siot.do',
    // buyer_addr: '서울시 강남구 신사동 661-16',
    // buyer_postcode: '06018',
    app_scheme: 'example',
    // [Deprecated v1.0.3]: m_redirect_url
  };

  return (
    <IMP.Payment
      userCode={IAMPORT_CODE} // 가맹점 식별코드
      data={data} // 결제 데이터
      callback={callback} // 결제 종료 후 콜백
    />
  );
}

export default Payment;
