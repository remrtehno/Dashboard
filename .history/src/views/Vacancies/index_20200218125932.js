import React, {useEffect} from 'react';
import {Col, Row, Button, Table, CardBody, Input} from "reactstrap";
import _ from 'lodash';
import {Select} from 'react-select';

import {useVacanciesApi} from "./useVacanciesApi";
import {Link} from "react-router-dom";

const Component = () => {
  const [getAllVacancies, load] = useVacanciesApi();

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" className="mb-3">
          <h2 className="mb-3"> Вакансии </h2>
            <Input />
            <Select
                placeholder={"Rub"}
                closeMenuOnSelect={true}
                options={ [{value: 'Rub', label: 'Rub'}, {value: '$', label: '$'}] }
                onChange={ (value) => { setPrice(value.value, 'currency' ) } } />
            <hr color="black"/>

            {
              _.map(  getAllVacancies, (value, key) => {
                return (
                  <Link key={key} className="vacancy" to={`vacancy/${value.id}`} >
                    <div className="name">
                      {`${value.name}`}, {`${value.region.name}`}
                    </div>
                    <div className="vacancy-field">
                      Профиль: {`${value.profile.name}`}
                    </div>
                    <div className="vacancy-field">
                      Регион: {`${value.region.name}`}
                    </div>
                    <div className="vacancy-field">
                      Статус: {`${value.status}`}
                    </div>
                  </Link>
                )
              })
            }
        </Col>
      </Row>
    </div>
  );
};

export default Component;
