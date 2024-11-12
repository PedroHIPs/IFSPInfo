import React, { useState, useEffect } from "react";
import ConteudoService from "services/ConteudoService";
import CursoService from "services/CursoService";
import { useNavigate, useLocation } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Input
} from "reactstrap";

function ConteudoAdd() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownArea, setDropdownArea] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Curso ou Área");
  const [curso, setCurso] = useState(null);
  const [link, setLink] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [autor, setAutor] = useState(null);
  const [texto, setTexto] = useState(null);
  const [area, setArea] = useState("Área");

  const [administradorId, setAdministradorId] = useState(null);
  const [cursoId, setCursoId] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [campusId, setCampusId] = useState(null);

  const [isEdit, setIsEdit] = useState(false); // Novo estado para verificar se é edição


  useEffect(() => {
    // Recupera o administrador da sessão
    const admin = JSON.parse(sessionStorage.getItem("admin"));

    if (admin && admin.email) {// Seta no state
      setAdministradorId(admin.id);
      setCampusId(admin.campus.id);
      setCursoId(1);
    } else {
      navigate('/login'); // Redireciona para o login se não houver administrador logado
    }

    // Verifica se a página foi acessada com o conteúdo para edição
    if (location.state?.conteudo) {
      const conteudo = location.state.conteudo;
      setAutor(conteudo.autor);
      setLink(conteudo.link);
      setTitulo(conteudo.titulo);
      setTexto(conteudo.texto);
      setSelectedItem(conteudo.curso ? conteudo.curso.nome : conteudo.area);
      setCursoId(conteudo.curso ? conteudo.curso.id : null);
      setCampusId(conteudo.campus)
      setIsEdit(location.state.isEdit); // Seta o modo de edição
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchCursos = async () => {
      if (campusId !== null) {
        try {
          const response = await CursoService.getCursosByCampus(campusId);
          console.log('Dados dos Cursos:', response.data);
          setCursos(response.data);
        } catch (error) {
          console.error('Erro ao buscar cursos:', error);
        }
      }
    };
  
    fetchCursos();
  }, [campusId]);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleSelect = (item) => {
    if (item && item.nome) {
      // Caso seja um curso
      setSelectedItem(item.nome); // Atualiza o texto com o nome do curso selecionado
      setCursoId(item.id); // Armazena o ID do curso selecionado
    } else if (typeof item === 'string') {
      // Caso seja uma área (como Administração ou Secretária)
      setSelectedItem(item); // Atualiza o texto com o nome da área selecionada
      setCursoId(null); // Limpa o ID do curso, pois não é um curso selecionado
    }
  };

  const hadleConteudoCRUDClick = () => {
    navigate('/admin/conteudoCRUD'); // Navega para a pagina de edição de conteudo
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const conteudoData = {
    autor,
    link,
    texto,
    area: cursoId ? selectedItem : selectedItem, // Se um curso foi selecionado, área será o nome do curso, caso contrário será null
    titulo,
    curso: cursoId ? { id: cursoId } : null,  // Inclui o curso apenas se cursoId for válido
    campus: { id: campusId },
    administrador: { id: administradorId }
    };
    
    if (isEdit) {
      // Atualiza o conteúdo existente
      const confirmEdit = window.confirm('Tem certeza que deseja editar este conteúdo?');
      if (confirmEdit) {
          ConteudoService.updateConteudo(location.state.conteudo.id, conteudoData)
              .then(response => {
                  alert('Conteúdo editado com sucesso!');
                  navigate('/admin/conteudoCRUD');
              })
              .catch(error => {
                  console.error("Erro ao editar conteúdo", error);
              });
      }
    } else {
      // Cria novo conteudo
      const confirmAdd = window.confirm('Tem certeza que deseja adicionar este conteudo?');
        if (confirmAdd) {
          ConteudoService.createConteudo(conteudoData)
            .then(response => {
              alert('Conteudo cadastrado com sucesso!');
              // resetForm(); Limpa o formulário após a adição
            })
            .catch(error => {
              console.error("Erro ao cadastrar Conteudo", error);
        });
      }
    }
  }

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{
          backgroundImage: `url(${require("assets/img/greenbackground.jpg")})`,
          backgroundSize: 'cover',
          height: '100vh',
          width: '100%'
        }}>
        <Card style={{ width: '1000px' }}>
          <CardHeader>
            <h5>Adicionar Notícia</h5>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <form >
                <Row>
                  <Col md="12">
                  <label htmlFor="cmbCurso">Curso ou Área</label>
                    <Dropdown id="cmbCurso" isOpen={dropdownOpen} toggle={toggleDropdown}>
                      <DropdownToggle caret color="grey">
                        {selectedItem} {/* Exibe o item selecionado */}                    
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => handleSelect("Administração")}>Administração</DropdownItem>
                        <DropdownItem onClick={() => handleSelect("Secretaria")}>Secretaria</DropdownItem>
                        <DropdownItem divider />
                        {cursos.map((curso) => (
                          <DropdownItem key={curso.id} onClick={() => handleSelect(curso)}>
                            {curso.nome}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <label htmlFor="InputAutor">Autor</label>
                    <Input id="InputAutor" placeholder="Autor" type="text" value={autor} onChange={e => setAutor(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <label htmlFor="InputTitulo">Titulo</label>
                    <Input id="InputTitulo" placeholder="Titulo" type="text" value={titulo} onChange={e => setTitulo(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label htmlFor="InputTexto">Texto</label>
                      <Input id="InputTexto" type="textarea" p="5" placeholder="Texto"  value={texto} onChange={e => setTexto(e.target.value)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <label htmlFor="InputLink">Link Original</label>
                    <Input id="InputLink" placeholder="Link" type="text" value={link} onChange={e => setLink(e.target.value)} />
                  </Col>
                </Row>
                <Button className="btn-round mt-3" color="primary" type="submit" onClick={handleSubmit}>{isEdit ? 'Editar' : 'Adicionar'}</Button>
              </form>
            </FormGroup>
          </CardBody>
          <hr />
          <CardFooter>
            <p className="description text-center">
              <a onClick={hadleConteudoCRUDClick}>Gerenciar Notícias</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default ConteudoAdd;
