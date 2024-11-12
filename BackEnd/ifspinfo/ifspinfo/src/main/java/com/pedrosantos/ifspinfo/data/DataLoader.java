package com.pedrosantos.ifspinfo.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.pedrosantos.ifspinfo.repositories.CampusRepository;
import com.pedrosantos.ifspinfo.entities.Campus;



@Component
public class DataLoader implements CommandLineRunner{

	@Autowired
	private CampusRepository campusRepository;

	@Override
    @Transactional
	public void run(String... args) throws Exception {
		if (campusRepository.count() == 0) {
            
			Campus campus1 = new Campus("Araraquara","ARQ","Rua Doutor Aldo Benedito Pierri, 250, Jardim dos Manacás, Araraquara – SP", "https://arq.ifsp.edu.br/", 
            		"direcao.arq@ifsp.edu.br", 0,-21.783870122421906, -48.21074035767118);
            campusRepository.save(campus1);  
            Campus campus2 = new Campus("Salto","SLT","Av. dos Três Poderes, n° 375 - Residencial Central Parque, Salto - SP, 13325-047", "https://slt.ifsp.edu.br",
            		"cra.salto@ifsp.edu.br", 0,-23.18565804408751, -47.30240436695161);
            campusRepository.save(campus2);
            Campus campus3 = new Campus("Avaré","AVR","Av. Prof. Célso Ferreira da Silva, 1333 - Jardim Europa IAvaré - SP, 18707-150", "https://avr.ifsp.edu.br/ ",
            		"cra.avr@ifsp.edu.br", 0,-23.079005082869987, -48.92624550853381);
            campusRepository.save(campus3);
            Campus campus4 = new Campus("Barretos","BRT","Av. C- Um, 250 – Bairro - Res. Ide Daher, Barretos - SP, 14781-502", "https://brt.ifsp.edu.br",
            		"pra@ifsp.edu.br", 0,-20.540892561643687, -48.54952816022804);
            campusRepository.save(campus4);
            Campus campus5 = new Campus("Birigui","BRI","Rua Pedro Cavalo, 709 - Residencial Portal da Pérola II, Birigui - SP, 16201-407", "https://bri.ifsp.edu.br/",
            		"cre.bri@ifsp.edu.br", 0,-21.248979770426406, -50.315071846882425);
            campusRepository.save(campus5);
            Campus campus6 = new Campus("Boituva","BTV","R. Zélia de Lima Rosa, 100 - Recanto das Primaveras I, Boituva - SP, 18552-252", "https://btv.ifsp.edu.br/",
            		"cra.btv@ifsp.edu.br",0,-23.28827084786692, -47.65228410443958);
            campusRepository.save(campus6);
            Campus campus7 = new Campus("Bragança Paulista","BRA","Av. Maj. Fernando Valle, 2013 - São Miguel, Bragança Paulista - SP, 12903-000", "https://bra.ifsp.edu.br/",
            		"cra.bra@ifsp.edu.br",0,-22.948646640928107, -46.55846314388299);
            campusRepository.save(campus7);
            Campus campus8 = new Campus("Campinas","CMP","R. Heitor Lacerda Guedes, 1000 - Cidade Satélite Íris, Campinas - SP, 13059-581", "https://portal.cmp.ifsp.edu.br/",
            		"cra.cmp@ifsp.edu.br",0,-22.948100202904403, -47.14976767426008);
            campusRepository.save(campus8);
            Campus campus9 = new Campus("Campos do Jordão","CJO","Rua Monsenhor José Vita, 280 - Abernéssia, Campos do Jordão - SP, 12460-000", "https://www.ifspcjo.edu.br/portal",
            		"cra.cjo@ifsp.edu.br",0,-22.74264130745649, -45.5925831171021);
            campusRepository.save(campus9);
            Campus campus10 = new Campus("Capivari","CPV","Av. Dr. Ênio Pires de Camargo, 2971 - Ribeirão, Capivari - SP, 13365-010", "https://cpv.ifsp.edu.br/",
            		"cra.cpv@ifsp.edu.br",0,-22.976623904866802, -47.47372158859106);
            campusRepository.save(campus10);
            Campus campus11 = new Campus("Bauru","BRU","Rua Severino Lins, 7-10, Vila Aviação, 17018-600, Bauru - SP", "https://bru.ifsp.edu.br",
            		"adm.bru@ifsp.edu.br",0,-22.355430, -49.047010);
            campusRepository.save(campus11);
            Campus campus12 = new Campus("Caraguatatuba", "CRA", "Avenida Bahia, 1739 - Indaiá, Caraguatatuba/SP, 11665-071", "https://www.ifspcaraguatatuba.edu.br/", 
            		"cra.cra@ifsp.edu.br", 0, -23.636480, -45.426090);
            campusRepository.save(campus12);
            Campus campus13 = new Campus("Catanduva", "CTD", "Av. Pastor José Dutra de Moraes, 239 - Distrito Industrial Antônio Zácaro, Catanduva/SP, 15808-305", "https://ctd.ifsp.edu.br/", 
            		"cra.ctd@ifsp.edu.br", 0, -21.145810, -48.946670);
            campusRepository.save(campus13);
            Campus campus14 = new Campus("Cubatão", "CBT", "Rua Maria Cristina, 50 - Jardim Casqueiro, Cubatão/SP, 11533-160", "https://cbt.ifsp.edu.br/", 
            		"cra.cbt@ifsp.edu.br", 0, -23.928440, -46.410950);
            campusRepository.save(campus14);
            Campus campus15 = new Campus("Guarulhos", "GRU", "Av. Salgado Filho, 3501 - Vila Rio de Janeiro, Guarulhos/SP, 07115-000", "https://gru.ifsp.edu.br/", 
            		"cra.gru@ifsp.edu.br", 0,-23.439314734702457, -46.53689710533994);
            campusRepository.save(campus15);
            Campus campus16 = new Campus("Hortolândia", "HTO", "Av. Thereza Ana Cecon Breda, 1896 - Vila Sao Pedro, Hortolândia/SP, 13183-250", "https://hto.ifsp.edu.br/", 
            		"cra.hto@ifsp.edu.br", 0, -22.850908137414446, -47.23125246303279);
            campusRepository.save(campus16);
            Campus campus17 = new Campus("Ilha Solteira", "IST", "Alameda Tucuruí, 164, Ilha Solteira/SP, 15385-000", "https://ist.ifsp.edu.br/", 
            		"cra.ist@ifsp.edu.br", 0, -20.420830562310936, -51.33315263428514);
            campusRepository.save(campus17);
            Campus campus18 = new Campus("Itapetininga", "ITP", "Av. João Olímpio de Oliveira, 1561 - Vila Asem, Itapetininga/SP, 18202-000", "https://itp.ifsp.edu.br/", 
            		"cra.itp@ifsp.edu.br", 0, -23.59340589381768, -48.018355514571205);
            campusRepository.save(campus18);
            Campus campus19 = new Campus("Itaquaquecetuba", "ITQ", "Rua Primeiro de Maio, n.º 500, bairro Estação, Itaquaquecetuba/SP, 08571-050", "https://itq.ifsp.edu.br/", 
            		"cra.itq@ifsp.edu.br", 0, -23.485168577435115, -46.343322876502995);
            campusRepository.save(campus19);
            Campus campus20 = new Campus("Jacareí", "JCR", "R. Antônio Fogaça de Almeida, 200 - Jardim America, Jacareí/SP, 12322-030", "https://jcr.ifsp.edu.br/", 
            		"cra.jcr@ifsp.edu.br", 0, -23.317278974800153, -45.98414277835575);
            campusRepository.save(campus20);
            Campus campus21 = new Campus("Jundiaí", "JND", "Av. Ângelo Pellicciari, 727 - Parque Residencial Jundiaí II, Jundiaí/SP, 13213-119", "https://jnd.ifsp.edu.br/", 
            		"cra.jnd@ifsp.edu.br", 0, -23.15037300752931, -47.00283010919371);
            campusRepository.save(campus21);
            Campus campus22 = new Campus("Miracatu", "MRC", "Av Da Saudade S/N, Miracatu/SP, 11850-000", "https://mrc.ifsp.edu.br/", 
            		"cra.mrc@ifsp.edu.br", 0, -24.28643966744867, -47.45517463486663);
            campusRepository.save(campus22);
            Campus campus23 = new Campus("Pirituba", "PTB", "Av. Mutinga, 951 - Jardim Santo Elias, São Paulo/SP, 05110-000", "https://ptb.ifsp.edu.br/", 
            		"cra.ptb@ifsp.edu.br", 0, -23.488378910759657, -46.73479553105107);
            campusRepository.save(campus23);
            Campus campus24 = new Campus("Presidente Epitácio", "PEP", "R. José Ramos Júnior, 27-50 - Jardim Tropical, Pres. Epitácio/SP, 19470-000", "https://pep.ifsp.edu.br/", 
            		"cra.pep@ifsp.edu.br", 0, -21.78514127838608, -52.11149214773167);
            campusRepository.save(campus24);
            Campus campus25 = new Campus("Registro", "RGT", "Av. Clara Gianotti de Souza, 5180 - Jardim Agrochá, Registro/SP, 11900-000", "https://rgt.ifsp.edu.br/",
            		"cra.rgt@ifsp.edu.br", 0, -24.533165892548688, -47.868356689955654);
            campusRepository.save(campus25);
            Campus campus26 = new Campus("Sorocaba", "SOR", "R. Nhonhô Píres, 250 - Vila Lucy, Sorocaba/SP, 18043-060", "https://sor.ifsp.edu.br/", 
            		"cra.sor@ifsp.edu.br", 0, -23.501672164290966, -47.47828622285323);
            campusRepository.save(campus26);
            Campus campus27 = new Campus("Matão", "MTO", "R. Estéfano D'avassi, 625 - Nova Cidade, Matão/SP, CEP 15991-50269 ", "https://mto.ifsp.edu.br/", 
            		"cra.mto@ifsp.edu.br", 0, -21.623149583990564, -48.348806044634266);
            campusRepository.save(campus27);
            Campus campus28 = new Campus("Piracicaba", "PRC", "Rua, Av. Diácono Jair de Oliveira, 1005 - Santa Rosa, Piracicaba/SP, 13414-155 ", "https://prc.ifsp.edu.br/", 
            		"cra.prc@ifsp.edu.br", 0, -22.69357580782892, -47.62441184769804);
            campusRepository.save(campus28);
            Campus campus29 = new Campus("Presidente Prudente", "PRU", "Rod. Assis Chateaubriand - SP-425, 1150 - Aeroporto, Pres. Prudente - SP", "https://pru.ifsp.edu.br/", 
            		"cra.pru@ifsp.edu.br", 0, -22.180611517741703, -51.419441966065456);
            campusRepository.save(campus29);
            Campus campus30 = new Campus("Rio Claro", "RCL", "R. Onze, 2611 - Santana, Rio Claro - SP, 13500-240", "https://rcl.ifsp.edu.br/", 
            		"cra.rcl@ifsp.edu.br", 0, -22.398687269280586, -47.57295673421469);
            campusRepository.save(campus30);
            Campus campus31 = new Campus("São Carlos", "SCL", "Estrada Municipal Paulo Eduardo de Almeida, CEP: 13-565-820 - Prado, São Carlos/SP, 13565-820", "https://scl.ifsp.edu.br/", 
            		"cra.scl@ifsp.edu.br", 0, -21.96993438515647, -47.878528920735924);
            campusRepository.save(campus31);
            Campus campus32 = new Campus("São João da Boa Vista", "SBV", "Av Marginal, 585 - Fazenda Nossa Senhora Aparecida do Jaguari, São João da Boa Vista/SP, 13871-298", 
            		"https://sbv.ifsp.edu.br/", "cra.sbv@ifsp.edu.br", 0, -21.966862631907023, -46.81279256491204);
            campusRepository.save(campus32);
            Campus campus33 = new Campus("São José do Rio Preto", "SJP", "R. Dr. Eduardo Nielsen, 420 - Jardim Congonhas, São José do Rio Preto/SP, 15030-070", "https://sjp.ifsp.edu.br/", 
            		"cra.sjp@ifsp.edu.br", 0, -20.80520158363463, -49.40507937660153);
            campusRepository.save(campus33);
            Campus campus34 = new Campus("São José dos Campos", "SJC", "Rod. Pres. Dutra, km 145 - s/n - Jardim Diamante, São José dos Campos/SP, 12223-201", "https://sjc.ifsp.edu.br/", 
            		"cra.sjc@ifsp.edu.br", 0, -23.190375530145975, -45.850643934184625);
            campusRepository.save(campus34);
            Campus campus35 = new Campus("São Miguel Paulista", "SMP", "R. Ten. Miguel Delia, 93 - Vila Rosaria, São Paulo/SP, 08021-090", "https://smp.ifsp.edu.br/", 
            		"cra.smp@ifsp.edu.br", 0, -23.498624231570467, -46.439026534172775);
            campusRepository.save(campus35);
            Campus campus36 = new Campus("São Paulo", "SPO", "Rua Pedro Vicente, 625 - Canindé, São Paulo/SP, 01109-010", "https://spo.ifsp.edu.br/", 
            		"cra.spo@ifsp.edu.br", 0, -23.524747410366846, -46.621910976501304);
            campusRepository.save(campus36);
            Campus campus37 = new Campus("São Roque", "SRQ", "Rodovia Prefeito Quintino de Lima, 2100 - Paisagem Colonial, São Roque/SP, 18145-090", "https://srq.ifsp.edu.br/", 
            		"cra.srq@ifsp.edu.br", 0, -23.55461906928933, -47.15041197962243);
            campusRepository.save(campus37);
            Campus campus38 = new Campus("Sertãozinho", "SRT", "R. Américo Ambrósio, 269 - Jardim Canaa, Sertãozinho/SP, 14169-263", "https://srt.ifsp.edu.br/", 
            		"cra.srt@ifsp.edu.br", 0, -21.14380269175674, -47.973379073602715);
            campusRepository.save(campus38);
            Campus campus39 = new Campus("Suzano", "SZN", "Av. Mogi das Cruzes, 1501 - Parque Suzano, Suzano/SP, 08673-010", "https://szn.ifsp.edu.br", 
            		"cra.szn@ifsp.edu.br", 0, -23.53556545179304, -46.32658397650093);
            campusRepository.save(campus39);
            Campus campus40 = new Campus("Tupã", "TUP", "Rua Othon Guedes Junior, 175 - Parque Universitário, Tupã/SP, CEP 17607-325", "https://tup.ifsp.edu.br/", 
            		"cra.tup@ifsp.edu.br", 0, -21.923795774140345, -50.52198827656172);
            campusRepository.save(campus40);
            Campus campus41 = new Campus("Votuporanga", "VTP", "Av. Jerônimo Figueira da Costa, 3014 - Pozzobon, Votuporanga/SP, 15503-110", "https://vtp.ifsp.edu.br/", 
            		"cra.vtp@ifsp.edu.br", 0, -20.402057111339357, -49.960831591956044);
            campusRepository.save(campus41);
        }
		
	}
}
