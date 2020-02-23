import React, {useEffect, useState} from 'react';
import HOST_URL from "../../constants";
import {Col, Row, Input, Button, Table, CardBody, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import _ from 'lodash';
import Select from 'react-select'

import {useLocalRegions} from '../Regions/useRegionsApi';
import useProfilesApi from "../Profiles/useProfilesApi";
import usePostVacancies, {useVacanciesApi, deleteVacancyApi} from "./useVacanciesApi";
import {Link} from "react-router-dom";

const Component = () => {

  const [allRegion, searchField, loadRegionsAll] = useLocalRegions();
  const [profiles, loadProfiles, allProfiles] = useProfilesApi();
  const [modal, setModal] = useState({modal: false});
  const [prices, setPrices] = useState({currency: 'Rub', from: '0', to: '0'});
  const [externalIds, setExternalIds] = useState({});
  const [vacancy, setVacancy] = useState({
    "region": {
      "id": "string",
      "name": "string"
    },
    "profile": {
      "id": "string",
      "name": "string"
    },
    "name": "string",
    "salary": {
      "from": 0,
      "to": 0,
      "currency": "Rub"
    },
    "openPositions": 0,
    "externalIds": [],
    "status": "Active",
    "tenantId": 0
  });

  const toggle = () => {
    setModal({modal: !modal.modal, });
  };

  useEffect(() => {
    loadProfiles();
    loadRegionsAll();
  }, []);

  console.log(searchField);

  const selectRegion = (selected) => {
    _.forEach(allRegion, ({name, id}) => {
      if( selected.value === name ) {
        setVacancy( oldArray => {
          let obj = Object.assign({}, oldArray);
          obj.region = {"name": name, "id": id };
          return obj;
        });
      }
    });
  };


  const selectProfile = (selected) => {
    _.forEach(allProfiles, ({name, id}) => {
      if( selected.value === name ) {
        setVacancy( oldArray => {
          let obj = Object.assign({}, oldArray);
          obj.profile = {"name": name, "id": id };
          return obj;
        });
      }
    });
  };

  const setName = (value) => {
    console.log(value);
    setVacancy( oldArray => {
      let obj = Object.assign({}, oldArray);
      obj.name = value;
      return obj;
    } );
  };

  const setOpenPositions = (value) => {
    setVacancy( oldArray => {
      let obj = Object.assign({}, oldArray);
      obj.openPositions = Number(value);
      return obj;
    } );
  };
  const setStatus = (value) => {
    setVacancy( oldArray => {
      let obj = Object.assign({}, oldArray);
      obj.status = value;
      return obj;
    } );
  };


  const setPrice = (val, property) => {
    setPrices( (oldArray) => {
      let obj = Object.assign({}, oldArray);
      obj[property] = Number(val);
      return obj;
    });
  };

  const addExternarIds = (value, key) => {
    setExternalIds( (oldArray) => {
      let obj = Object.assign({}, oldArray);
      obj[key] = value;
      return obj;
    });
  };

  const addToVacancy = (value, key) => {
    setVacancy( oldArray => {
      let obj = Object.assign({}, oldArray);
      obj[key].push(value);
      return obj;
    });
  };

  vacancy.salary = {"currency": prices.currency, from: prices.from, to: prices.to,};

  console.log(vacancy);

  const [sendVacancy] = usePostVacancies();

  const [getAllVacancies, load] = useVacanciesApi();
  const [deleteVacancy] = deleteVacancyApi();


  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" className="mb-3">  <h2> Сохранить в базу </h2> </Col>
        <Col lg="6" className="mb-3">
          <h5>  Регион </h5>
          <Select
            closeMenuOnSelect={true}
            options={ searchField }
            onChange={ (value) => { selectRegion(value) } } />
        </Col>
        <Col lg="6" className="mb-3">
          <h5> Профиль </h5>
          <Select
            closeMenuOnSelect={true}
            options={ profiles }
            onChange={ (value) => { selectProfile(value) } } />
        </Col>
        <Col lg="6" className="mb-3">
          <h5> Название вакансии </h5>
          <Input type="text" onChange={(event) => { setName(event.target.value ) } } />
        </Col>
        <Col lg="6" className="mb-3">
          <h5> Количество открытых вакансий </h5>
          <Input type="text" onChange={(event) => { setOpenPositions(event.target.value ) } } />
        </Col>
        <Col lg="12" className="mb-3">
          <h5> Зарплата </h5>
          <Row>
            <Col lg="5" className="mb-3"> <Input type="text" onChange={(event) => { setPrice(event.target.value, 'from' )}} placeholder={'От'} /> </Col>
            <Col lg="5" className="mb-3"> <Input type="text" onChange={(event) => { setPrice(event.target.value, 'to')}} placeholder={'До'} /> </Col>
            <Col lg="2" className="mb-3">
              <Select
                placeholder={"Rub"}
                closeMenuOnSelect={true}
                options={ [{value: 'Rub', label: 'Rub'}, {value: '$', label: '$'}] }
                onChange={ (value) => { setPrice(value.value, 'currency' ) } } />
            </Col>
          </Row>
        </Col>
        <Col lg="6" className="mb-3">
          <h5> Статус вакансии </h5>
          <Select
            closeMenuOnSelect={true}
            options={ [{value: 'Active', label: 'Активная'}, {value: 'Stopped', label: 'Остановленная'}] }
            onChange={ (value) => { setStatus(value.value) } } />
        </Col>
        <Col lg="6" className="mb-3">
          <h5> Внешние ID </h5>
          <Button onClick={toggle} className="mr-1">Добавить</Button>
          <Modal isOpen={modal.modal} toggle={toggle} >
            <ModalBody>
              <Input className="mb-3" type="text" onChange={(event) => { addExternarIds(event.target.value, 'id') } } placeholder={'ID'} />
              <Select
                className="mb-3"
                placeholder={"System"}
                closeMenuOnSelect={true}
                options={ [{value: 'Skillaz', label: 'Skillaz'}, {value: 'SF', label: 'SF'}] }
                onChange={ (value) => { addExternarIds(value.value, 'system')} } />
              <Button disabled={_.isEmpty(externalIds)} onClick={ () => { addToVacancy(externalIds, 'externalIds'); toggle(); }} className="mr-1">Добавить</Button>
            </ModalBody>
          </Modal>
        </Col>
        <Col lg="6" className="mb-5"> <Button onClick={ () => sendVacancy(vacancy) } className="mr-1">Отправить</Button> </Col>
      </Row>
    </div>
  );
};

export default Component;
