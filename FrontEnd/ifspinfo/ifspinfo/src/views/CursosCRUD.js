import React, { useState, useEffect } from "react";
import CursoService from "services/CursoService";
import { useNavigate } from 'react-router-dom';
import IconPicker from 'react-icons-picker';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
} from "reactstrap";

function CursosCRUD() {
  const [nivel, setNivel] = useState("");
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [notaCorte, setNotaCorte] = useState("");
  const [notaMEC, setNotaMEC] = useState("");
  const [icone, setIcone] = useState("");
  const [canditadoVaga, setCanditadoVaga] = useState("");
  const [cursoId, setCursoId] = useState(null);

  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [campusId, setCampusId] = useState(null);
  const [campusNome, setCampusNome] = useState(null);

  const handleDelete = async (cursoId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este curso?');
    if (confirmDelete) {
      try {
        await CursoService.deleteCurso(cursoId);
        setCursos(cursos.filter(curso => curso.id !== cursoId)); // Atualiza a lista de cursos
        alert('Curso excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir curso:', error);
        alert('Erro ao excluir curso, tente novamente.');
      }
    }
  };

  const handleEdit = (curso) => {
    setCursoId(curso.id); // Armazena o ID do curso que será editado
    setNivel(curso.nivel);
    setNome(curso.nome);
    setSigla(curso.sigla);
    setNotaCorte(curso.notaCorte);
    setNotaMEC(curso.notaMec);
    setIcone(curso.icone);
    setCanditadoVaga(curso.relacaoCanditadoVaga);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cursoData = {
      nome,
      nivel,
      sigla,
      notaCorte: parseInt(notaCorte),
      notaMec: parseInt(notaMEC),
      icone, 
      relacaoCanditadoVaga: parseInt(canditadoVaga),
      campus: { id: campusId }  // Inclui o campus selecionado
    };

    if (cursoId) {
      // Atualiza curso existente
      CursoService.updateCurso(cursoId, cursoData)
        .then(response => {
          setCursos(cursos.map(curso => curso.id === cursoId ? response.data : curso));
          alert('Curso atualizado com sucesso!');
          resetForm(); // Limpa o formulário após a atualização
        })
        .catch(error => {
          console.error("Erro ao atualizar Curso", error);
        });
    } else {
      // Cria novo curso
      const confirmAdd = window.confirm('Tem certeza que deseja adicionar este curso?');
      if (confirmAdd) {
        CursoService.createCurso(cursoData)
          .then(response => {
            setCursos([...cursos, response.data]);
            alert('Curso cadastrado com sucesso!');
            resetForm(); // Limpa o formulário após a adição
          })
          .catch(error => {
            console.error("Erro ao cadastrar Curso", error);
        });
      }
    }
  };

  const resetForm = () => {
    setNivel("");
    setNome("");
    setSigla("");
    setNotaCorte("");
    setNotaMEC("");
    setCanditadoVaga("");
    setIcone("");
    setCursoId(null); // Reseta o ID do curso
  };

  useEffect(() => {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    console.log('Dados do Admin:', admin);
  
    if (admin && admin.email) {
      setCampusId(admin.campus.id);
      setCampusNome(admin.campus.nome);
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
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

  return (
    <>
      <div className="content" >
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cursos do campus {campusNome}</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nivel</th>
                      <th>Nome</th>
                      <th>Sigla</th>
                      <th>Nota de Corte</th>
                      <th>NotaMEC</th>
                      <th>Canditado/Vaga</th>
                      <th>Ícone</th>
                      <th className="text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> 
                        <Input id="InputNivel" placeholder="Nivel" type="text" value={nivel} onChange={e => setNivel(e.target.value)} />
                      </td>
                      <td>
                        <Input id="InputNome" placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
                      </td>
                      <td>
                        <Input id="InputSigla" placeholder="Sigla" type="text" value={sigla} onChange={e => setSigla(e.target.value)} />
                      </td>
                      <td>
                        <Input id="InputNotaCorte" placeholder="Nota de Corte" type="text" value={notaCorte} onChange={e => setNotaCorte(e.target.value)} />
                      </td>
                      <td>
                        <Input id="InputNotaMEC" placeholder="Nota MEC" type="text" value={notaMEC} onChange={e => setNotaMEC(e.target.value)} />
                      </td>
                      <td>
                        <Input id="InputCanditadoVaga" placeholder="Canditado/Vaga" type="text" value={canditadoVaga} onChange={e => setCanditadoVaga(e.target.value)} />
                      </td>
                      <td>
                        <IconPicker value={icone} size={12} color="#000" onChange={e => setIcone(e)} />
                      </td>
                      <td className="text-right">
                        <button type="button" class="btn btn-success" onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"></path>
                        </svg>
                        </button>
                      </td>
                    </tr>
                  {cursos.map((curso, index) => (
                    <tr key={index}>
                      <td>{curso.nivel}</td>
                      <td>{curso.nome}</td>
                      <td>{curso.sigla}</td>
                      <td>{curso.notaCorte}</td>
                      <td>{curso.notaMec}/5</td>
                      <td>{curso.relacaoCanditadoVaga}</td>
                      <td>{curso.icone}</td>
                      <td className="text-right">
                        <button type="button" class="btn btn-info" onClick={() => handleEdit(curso)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                        </svg>
                        </button>
                        <p> </p>
                        <button type="button" class="btn btn-danger" onClick={() => handleDelete(curso.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
                        </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CursosCRUD;
