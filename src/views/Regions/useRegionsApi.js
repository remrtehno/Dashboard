import HOST_URL from "../../constants";
import _ from "lodash";
import {useState} from "react";

function useAllRegions() {

  const [allRegion, setAllRegion] = useState({});
  const [searchField, setSearchField] = useState([]);

  const loadRegions = (query = '') => {
    if(query === " " || !query) return;

    const token = localStorage.getItem('access_token');
    let url = new URL(HOST_URL +`/api/yandex-direct/regions`);
    let params = {search: query};
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url, {
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
      setAllRegion(result.items);
      setSearchField(
        _.map(result.items, (value) => { return {value: value.name, label: value.name}; })
      );
    });
  };

  return [allRegion, searchField, loadRegions];
};

export function useLocalRegions() {
  const [allRegion, setAllRegion] = useState({});
  const [searchField, setSearchField] = useState([]);

  const loadRegionsAll = () => {
    const token = localStorage.getItem('access_token');
    fetch(HOST_URL +`/api/regions`, {
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
      setAllRegion(result.items);
      setSearchField(
        _.map(result.items, ({name, id}) => { return {value: name, label: name, id: id}; })
      );
    });
  };

  return [allRegion, searchField, loadRegionsAll];
}

export default useAllRegions;
