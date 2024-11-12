import React, { useState, useEffect } from "react";
import ConteudoService from "services/ConteudoService";
import { useNavigate } from 'react-router-dom';

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
} from "reactstrap";

function ConteudoCRUD() {
  const [conteudoId, setConteudoId] = useState(null);

  const navigate = useNavigate();
  const [conteudos, setConteudos] = useState([]);

  const handleDelete = async (conteudoId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este conteúdo?');
    if (confirmDelete) {
      try {
        await ConteudoService.deleteConteudo(conteudoId);
        setConteudos(conteudos.filter(conteudo => conteudo.id !== conteudoId)); // Atualiza a lista de conteúdos
        alert('Conteúdo excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir conteúdo:', error);
        alert('Erro ao excluir conteúdo, tente novamente.');
      }
    }
  };

  const handleEdit = (conteudo) => {
    navigate('/admin/conteudo', { state: { conteudo, isEdit: true } });
  };


  useEffect(() => {
    const fetchConteudos = async () => {
      try {
        const response = await ConteudoService.getConteudos();
        setConteudos(response.data);
      } catch (error) {
        console.error('Erro ao buscar conteúdos:', error);
      }
    };

    fetchConteudos();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Conteúdos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Autor</th>
                      <th>Link</th>
                      <th>Título</th>
                      <th>Área</th>
                      <th>Curso</th>
                      <th className="text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conteudos.map((conteudo, index) => (
                      <tr key={index}>
                        <td>{conteudo.autor}</td>
                        <td>{conteudo.link}</td>
                        <td>{conteudo.titulo}</td>
                        <td>{conteudo.area}</td>
                        <td>{conteudo.curso ? conteudo.curso.nome : conteudo.area}</td>
                        <td className="text-right">
                          <button type="button" className="btn btn-info" onClick={() => handleEdit(conteudo)}>Editar</button>
                          <button type="button" className="btn btn-danger" onClick={() => handleDelete(conteudo.id)}>Excluir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ConteudoCRUD;
