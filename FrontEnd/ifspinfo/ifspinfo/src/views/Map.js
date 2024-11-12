import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CampusService from "services/CampusService";
import SearchBar from "components/Navbars/SearchBar"
import { FaStar } from "react-icons/fa";

const MapWrapper = () => {
  const [campuses, setCampuses] = useState([]);
  const [filteredCampuses, setFilteredCampuses] = useState([]);
  const [map, setMap] = useState(null);
  const [setDropdownOpen, DropdownOpen] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef([]); 
  const navigate = useNavigate();

  // Inicializa o mapa
  useEffect(() => {
    const google = window.google;
    const mapElement = mapRef.current;
    const initialLat = "-23.5489";
    const initialLng = "-46.6388";
    const myLatlng = new google.maps.LatLng(initialLat, initialLng);
    const mapOptions = {
      zoom: 8,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
    };

    const newMap = new google.maps.Map(mapElement, mapOptions);
    setMap(newMap);
  }, []);

  // Função para adicionar os marcadores ao mapa
  const addMarkers = (campusList) => {
    const google = window.google;
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];

    campusList.forEach((campus) => {
      const { latitude, longitude, nome, endereco } = campus;
      const campusLatlng = new google.maps.LatLng(latitude, longitude);
      const marker = new google.maps.Marker({
        position: campusLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: nome,
      });

      // Construindo as estrelas em HTML
      const filledStars = Math.floor(campus.nota); // Número de estrelas cheias
      const emptyStars = 5 - filledStars;   // Número de estrelas vazias
      const starHtml = `
          <div style="font-size: 24px;">
              ${'<i class="fas fa-star" style="color:#ffc107;"></i>'.repeat(filledStars)}
              ${'<i class="fas fa-star" style="color:#e4e5e9;"></i>'.repeat(emptyStars)}
          </div>`;

      // HTML do conteúdo do InfoWindow
      const contentString = `
          <div class="info-window-content">
              <h3>${nome}</h3>
              ${starHtml}
              <hr>
              <h4>${endereco}</h4>
              <button type="button" class="btn btn-success" id="navigateToUser">Sobre</button>
          </div>`;


      const infowindow = new google.maps.InfoWindow({
          content: contentString,
      });

      google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });

      google.maps.event.addListener(infowindow, 'domready', () => {
        document.getElementById('navigateToUser').addEventListener('click', () => {
           // Salvando os dados no sessionStorage
            sessionStorage.setItem('campusId', campus.id);
            sessionStorage.setItem('campusNome', campus.nome);

            // Navegando para a página
            navigate('/admin/dashboard');
        });
      });

      markers.current.push(marker);
    });
  };

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await CampusService.getCampus();
        console.log(response.data);
        setCampuses(response.data);
        setFilteredCampuses(response.data); 
      } catch (error) {
        console.error("Erro ao buscar os campi:", error);
      }
    };
    fetchCampuses();
  }, []);

  useEffect(() => {
    if (map && campuses.length > 0) {
      addMarkers(campuses);
    }
  }, [map, campuses]);

  // Função para dar zoom no campus selecionado
  const handleZoomToCampus = (campus) => {
    const { latitude, longitude } = campus;
    const google = window.google;
    const campusLatlng = new google.maps.LatLng(latitude, longitude);
    map.panTo(campusLatlng);
    map.setZoom(15);
  };

  // Função para filtrar os campi
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
  
    const filtered = campuses.filter((campus) => {
      const isNameMatch = campus.nome.toLowerCase().includes(searchTerm);
      const isCourseMatch = campus.cursos.some(course =>
        course.nome.toLowerCase().includes(searchTerm) // Acessa o nome do curso
      );
      return isNameMatch || isCourseMatch;
    });
  
    setFilteredCampuses(filtered);
  };

  return (
    <>
      <SearchBar
        onSearchChange={handleSearchChange}
        filteredCampuses={filteredCampuses} 
        handleZoomToCampus={handleZoomToCampus} 
      />
      <div className="map-content">
        <div id="map" className="map" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ height: `100%` }} ref={mapRef}></div>
        </div>
      </div>
    </>
  );
};

export default MapWrapper;
