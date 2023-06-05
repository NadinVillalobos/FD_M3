const valorP = document.querySelector('#presupuestoI')
const presupuestoT = document.querySelector('#presupuesto')
const gastoT = document.querySelector('#gasto')
const saldoT = document.querySelector('#saldo')
const gastos = [];
const trashy = `<svg id="trash" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffbf00" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
<path d="M4 7l16 0" />
<path d="M10 11l0 6" />
<path d="M14 11l0 6" />
<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
</svg>`;

const ingresoP = () => {
  if (valorP.value < 0) {
    alert('El valor ingresado no es valido');
    return;
  }
  var valorPre = valorP.value;
  presupuestoT.innerHTML = valorPre
  calcularGasto();
}

const crearGasto = () => {
  const tablaGastos = document.querySelector('.tablaG');
  const valorNG = document.querySelector('#nGasto').value;
  const valorCG = document.querySelector('#cGasto').value;

  const nuevaFila = document.createElement('tr');

  const celdaNG = document.createElement('td');
  celdaNG.innerHTML = valorNG;
  celdaNG.classList.add('celdaNG');

  const celdaCG = document.createElement('td');
  celdaCG.innerHTML = valorCG;
  celdaCG.classList.add('celdaCG');

  const crearEliminarTD = document.createElement('td');
  const crearEliminar = document.createElement('a');
  crearEliminar.innerHTML = trashy;
  crearEliminar.href = '#';
  crearEliminar.onclick = function () { eliminarGasto(this) };
  crearEliminarTD.appendChild(crearEliminar);

  nuevaFila.appendChild(celdaNG);
  nuevaFila.appendChild(celdaCG);
  nuevaFila.appendChild(crearEliminarTD);
  tablaGastos.appendChild(nuevaFila);

  const gasto = {
    nombre: valorNG,
    costo: valorCG
  };

  gastos.push(gasto);
  calcularGasto();
}

function eliminarGasto(enlace) {
  const enlaceEliminar = enlace.parentElement.parentElement;
  enlaceEliminar.remove();
  const valorCG = enlaceEliminar.querySelector('.celdaCG').innerHTML
  gastoT.innerHTML = valorCG

  const gastoEliminado = gastos.find(gasto => gasto.costo === valorCG);
  const indiceGasto = gastos.indexOf(gastoEliminado);
  if (indiceGasto > -1) {
    gastos.splice(indiceGasto, 1);
  }
  calcularGasto();
}

function calcularGasto() {
  let costoTotal = 0;
  for (const gasto of gastos) {
    costoTotal += parseFloat(gasto.costo);
  }

  gastoT.innerHTML = costoTotal;

  const presupuesto = parseFloat(presupuestoT.innerHTML);
  saldoT.innerHTML = (presupuesto - costoTotal);
}


