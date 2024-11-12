import React, { useState, useEffect } from "react";
import AdministradorService from "services/AdministradorService";
import CampusService from "services/CampusService";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";

function Signup() {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cpf, setcpf] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [aprovado, setAprovado] = useState(false);
  const [campusId, setCampusId] = useState(""); // Armazena o ID do campus selecionado
  const [campusList, setCampusList] = useState([]); // Armazena a lista de campus

  useEffect(() => {
    // Buscar a lista de campus quando o componente for montado
    CampusService.getCampus()
      .then(response => {
        setCampusList(response.data);
      })
      .catch(error => {
        console.error("Erro ao carregar a lista de campus", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoAdministrador = {
      nome,
      matricula,
      cpf: parseInt(cpf),
      dataNasc,
      email,
      senha,
      cargo,
      aprovado,
      campus: { id: campusId }  // Inclui o campus selecionado
    };

    AdministradorService.createAdministrador(novoAdministrador)
      .then(response => {
        console.log("Administrador cadastrado com sucesso", response);
        // Redirecionar ou exibir uma mensagem de sucesso
      })
      .catch(error => {
        console.error("Erro ao cadastrar administrador", error);
        // Exibir uma mensagem de erro
      });
  };

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{
          backgroundImage: `url(${require("assets/img/greenbackground.jpg")})`,
          backgroundSize: 'cover',
          height: '100vh',
          width: '100%'
        }}>
        <Card>
          <CardHeader>
            <h5>Cadastro</h5>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md="6">
                    <label htmlFor="InputNome">Nome</label>
                    <Input id="InputNome" placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <label htmlFor="InputMatricula">Matrícula</label>
                    <Input id="InputMatricula" placeholder="Matrícula" type="text" value={matricula} onChange={e => setMatricula(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <label htmlFor="InputCargo">Cargo</label>
                    <Input id="InputCargo" placeholder="Cargo" type="text" value={cargo} onChange={e => setCargo(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <label htmlFor="Inputcpf">CPF</label>
                    <Input id="Inputcpf" placeholder="cpf" type="text" value={cpf} onChange={e => setcpf(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <label htmlFor="InputEmail">Email</label>
                    <Input id="InputEmail" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <label htmlFor="inputDataNasc">Data de Nascimento</label>
                    <Input id="inputDataNasc" type="date" value={dataNasc} onChange={e => setDataNasc(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <label htmlFor="InputSenha1">Senha</label>
                    <Input id="InputSenha1" placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
                  </Col>
                  <Col md="6">
                    <label htmlFor="InputSenha2">Repetir Senha</label>
                    <Input id="InputSenha2" placeholder="Senha" type="password" />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <label htmlFor="selectCampus">Campus</label>
                    <Input id="selectCampus" type="select" value={campusId} onChange={e => setCampusId(e.target.value)}>
                      <option value="">Selecione o Campus</option>
                      {campusList.map(campus => (
                        <option key={campus.id} value={campus.id}>{campus.nome}</option>
                      ))}
                    </Input>
                  </Col>
                </Row>
                <Button className="btn-round mt-3" color="primary" type="submit">Cadastrar</Button>
              </form>
            </FormGroup>
          </CardBody>
          <hr />
          <CardFooter>
            <p className="description text-center">
              Já tem uma conta? <a href="/login">Faça login aqui</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Signup;
