import HOST_URL from "../../constants";
import _ from "lodash";
import {useState} from "react";
import useAllRegions from "../Regions/useRegionsApi";

function usePostVacancies() {
  const sendVacancy = (query = '') => {
    if(query === " " || !query) return;
    const token = localStorage.getItem('access_token');
    fetch(HOST_URL +`/api/vacancy`, {
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(query),
    }).then((result) => {
      if(result.status === 500) alert(result.status); return result.status;
      if (result.status === 200) {
        return result.clone().json()
      }
    }).then((result) => {
      alert('Вакансия создана');
      window.location.reload();
    });
  };
  return [sendVacancy, ]
};

export function useVacanciesApi() {
  const [allVacancies, setAllVacancies] = useState({});

  const load = () => {
    const token = localStorage.getItem('access_token');
    fetch(HOST_URL + `/api/vacancy`, {
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
      setAllVacancies(result.items);
    });
  };
  return [allVacancies, load];
}

export function deleteVacancyApi() {
  const deleteVacancy = (id) => {
    const token = localStorage.getItem('access_token');
    fetch(HOST_URL + `/api/vacancy/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'text/plain',
        'Authorization': 'Bearer ' + token
      },
    }).then((result) => {
      if(result.status === 500) return result.status;
      if (result.status === 200) {
        alert('Вакансия удалена');
        window.location.reload();
      }
    });
  };
  return [deleteVacancy];
}

export default usePostVacancies;
