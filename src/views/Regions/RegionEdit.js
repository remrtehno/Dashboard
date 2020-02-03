import React, {useEffect, useState} from 'react';
import HOST_URL from "../../constants";
import {Col, Row, Input, Button, Table, CardBody} from "reactstrap";
import Select from 'react-select'
import _ from 'lodash';

const RegionEdit = (props) => {
  const regionId = props.match.params.id;
  const [region, setRegion] = useState({});
  const [allRegion, setAllRegion] = useState({});

  const loadRegion = () => {
    const token = localStorage.getItem('access_token');
    fetch(HOST_URL +`/api/regions/${regionId}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
        'Authorization': 'Bearer ' + token
      },
    }).then((result) => {
      if (result.status === 200) {
        return result.clone().json()
      }
    }).then((result) => {
      console.log(result);
      //setRegion(result);
    });
  };

  const getAllRegions = () => {
    const token = localStorage.getItem('access_token');
    fetch(HOST_URL +`/api/yandex-direct/regions`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
        'Authorization': 'Bearer ' + token
      },
    }).then((result) => {
      if (result.status === 200) {
        return result.clone().json()
      }
    }).then((result) => {
      setAllRegion(
        _.map(result.items, (value) => {
          return {name: value.name, label: value.name};
        })
      );
    });
  };

  useEffect(() => {
    loadRegion(regionId);
    getAllRegions();
  }, []);

  console.log(window.p = region);
  console.log(window.pa = allRegion);
  console.log(window._ = _);



  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="12" className="mb-0">
          <h2 className="mb-3"> Редактировать регион</h2>
          <Table responsive striped hover className="mb-5">
            <tbody>
              <tr>
                <td>name:</td>
                <td><Input type="text" autoComplete="username" placeholder={region.name}  /></td>
              </tr>
              <tr>
                <td>nameDative:</td>
                <td> <Input type="text" autoComplete="username" placeholder={region.nameDative} /> </td>
              </tr>
              <tr>
                <td>utm:</td>
                <td><Input type="text" autoComplete="username" placeholder={region.utm}  /></td>
              </tr>
            </tbody>
          </Table>
          <div className="mb-2">
          {
            _.map(region.yandexRegions, ({name}) => {
              return (
                <span>{name}, </span>
              );
            })
          }
          </div>
        </Col>
        <Col lg="6" className="mb-4">
          <Select options={allRegion} />
        </Col>
        <Col lg="6" className="mb-4">
          <Button onClick={()=> {}}  color="primary">Сохранить</Button>
        </Col>
      </Row>
    </div>
  );
};

export default RegionEdit;