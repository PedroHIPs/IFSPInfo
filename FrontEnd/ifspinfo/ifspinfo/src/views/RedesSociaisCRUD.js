import React, { useState, useEffect } from "react";
import RedesService from "services/RedesService";
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

function RedesSociaisCRUD() {
  const [nome, setNome] = useState("");
  const [url, setUrl] = useState("");
  const [redes, setRedes] = useState([]);
  const [icone, setIcone] = useState("");
  const [corBG, setCorBG] = useState([]);

  const [redeId, setRedeId] = useState(null);
  const [campusId, setCampusId] = useState(null);
  const [campusNome, setCampusNome] = useState(null);

  const navigate = useNavigate();

  const resetForm = () => {
    setNome("");
    setIcone("");
    setUrl("");
    setCorBG("");
    setRedeId(null);
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
    const fetchRedes = async () => {
      if (campusId !== null) {
        try {
          const response = await RedesService.getRedesByCampus(campusId);
          console.log('Dados das Redes sociais:', response.data);
          setRedes(response.data);
        } catch (error) {
          console.error('Erro ao buscar redes sociais:', error);
        }
      }
    };
  
    fetchRedes();
  }, [campusId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const redeData = {
      nome,
      url,
      icone,
      corBG,
      campus: { id: campusId }  // Inclui o campus selecionado
    };

    if (redeId) {
      // Atualiza curso existente
      RedesService.updateRede(redeId, redeData)
        .then(response => {
          setRedes(redes.map(rede => rede.id === redeId ? response.data : rede));
          alert('Rede Social atualizada com sucesso!');
          resetForm(); // Limpa o formulário após a atualização
        })
        .catch(error => {
          console.error("Erro ao atualizar Rede Social", error);
        });
    } else {
      // Cria novo curso
      const confirmAdd = window.confirm('Tem certeza que deseja adicionar este curso?');
      if (confirmAdd) {
        RedesService.createRedes(redeData)
          .then(response => {
            setRedes([...redes, response.data]);
            alert('Rede Social cadastrada com sucesso!');
            resetForm(); // Limpa o formulário após a adição
          })
          .catch(error => {
            console.error("Erro ao cadastrar Curso", error);
        });
      }
    }
    
  };

  const handleDelete = async (redeId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta rede social?');
    if (confirmDelete) {
      try {
        await RedesService.deleteRede(redeId);
        setRedes(redes.filter(rede => rede.id !== redeId)); // Atualiza a lista de cursos
        alert('Rede excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir rede social:', error);
        alert('Erro ao excluir rede social:, tente novamente.');
      }
    }
  };

  const handleEdit = (rede) => {
    setRedeId(rede.id); // Armazena o ID do curso que será editado
    setNome(rede.nome);
    setCorBG(rede.corBG);
    setIcone(rede.icone);
    setUrl(rede.url);
  };

  return (
    <>
      <div className="content" >
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Redes Sociais do campus {campusNome}</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nome</th>
                      <th>URL</th>
                      <th>Icone</th>
                      <th>Cor de Fundo</th>
                      <th className="text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Input id="InputNome" placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
                      </td>
                      <td>
                        <Input id="InputUrl" placeholder="URL" type="text" value={url} onChange={e => setUrl(e.target.value)} />
                      </td>
                      <td>
                        <IconPicker value={icone} size={12} color="#000" onChange={e => setIcone(e)} />
                      </td>
                      <td>
                        <Input id="InputCorBG" placeholder="#000000" type="text" value={corBG} onChange={e => setCorBG(e.target.value)} />
                      </td>
                      <td className="text-right">
                        <button type="button" class="btn btn-success" onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"></path>
                        </svg>
                        </button>
                      </td>
                    </tr>
                  {redes.map((rede, index) => (
                    <tr key={index}>
                      <td>{rede.nome}</td>
                      <td>{rede.url}</td>
                      <td>{rede.icone}</td>
                      <td>{rede.corBG}</td>
                      <td className="text-right">
                        <button type="button" class="btn btn-info" onClick={() => handleEdit(rede)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"></path>
                        </svg>
                        </button>
                        <p> </p>
                        <button type="button" class="btn btn-danger" onClick={() => handleDelete(rede.id)}>
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

export default RedesSociaisCRUD;
