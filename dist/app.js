const navButtons=[...document.querySelectorAll('.nav-btn')];
const views=[...document.querySelectorAll('.view')];
navButtons.forEach(btn=>btn.addEventListener('click',()=>{
  navButtons.forEach(b=>b.classList.toggle('active',b===btn));
  views.forEach(v=>v.classList.toggle('active',v.id===btn.dataset.view));
  window.scrollTo({top:0,behavior:'smooth'});
}));

const steps=[
  ['รับข้อมูลเรียบร้อย','ยืนยันตัวตนและสร้างโปรไฟล์ผู้เข้าร่วม 245 คน'],
  ['กำลังคัดกรองข้อมูล','ระบบพบ 12 ทีมพร้อมเข้าสู่กระบวนการ Coaching'],
  ['จับคู่ผู้สนับสนุน','ส่งคำเชิญ Coach และ PLC ให้ 8 ทีมเป้าหมาย'],
  ['สร้างแผนพัฒนา','เปิด Portfolio และรายการหลักฐานรายทีม'],
  ['คัดเลือกเพื่อขยายผล','พบ 7 ผลงานพร้อมนำเสนอระดับภาค'],
  ['สรุปเพื่อการตัดสินใจ','อัปเดต Dashboard และสร้างรายการติดตามรอบใหม่']
];
const flow=[...document.querySelectorAll('.flow-step')];
function setStep(index){
  flow.forEach((el,i)=>{el.classList.toggle('done',i<index);el.classList.toggle('active',i===index)});
  document.getElementById('automationText').innerHTML=`<b>${steps[index][0]}</b><br>${steps[index][1]}`;
  document.getElementById('automationCount').textContent=`${String(index+1).padStart(2,'0')}/06`;
}
flow.forEach((el,i)=>el.addEventListener('click',()=>setStep(i)));
document.getElementById('runAutomation').addEventListener('click',async()=>{
  document.body.classList.add('running');
  for(let i=0;i<steps.length;i++){setStep(i);await new Promise(r=>setTimeout(r,650))}
  document.body.classList.remove('running');
  const toast=document.getElementById('toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3600);
});

const zones=[
  {no:'01',type:'WELCOME & MAPPING',title:'จุดรับเข้าและสำรวจความพร้อม',desc:'ยืนยันตัวตน ลงทะเบียน และเก็บข้อมูลความต้องการครั้งเดียว ระบบสร้างโปรไฟล์และเส้นทางพัฒนาให้ทันที',list:['เช็กอินผ่าน QR / Line OA','Mapping ปัญหาและศักยภาพ','ส่งต่อทีมและทรัพยากรอัตโนมัติ'],data:'Profile → Dashboard → Coach'},
  {no:'02',type:'DIGITAL PLATFORM',title:'แพลตฟอร์มและ Portfolio',desc:'พื้นที่ทำงานดิจิทัลของครูและทีมพัฒนา เก็บเป้าหมาย แผนงาน ผลงาน และหลักฐานไว้ในที่เดียว',list:['แฟ้มสะสมงานรายบุคคลและรายทีม','บันทึกหลักฐานจากกิจกรรม','ติดตามความก้าวหน้าแบบเป็นรอบ'],data:'Portfolio → Evidence → Progress'},
  {no:'03',type:'COACHING & PLC',title:'วง Coaching และชุมชนเรียนรู้',desc:'ระบบจับคู่คนที่มีโจทย์กับผู้เชี่ยวชาญ นัดหมาย ติดตามข้อเสนอแนะ และไม่ปล่อยให้ทีมหลุดจากกระบวนการ',list:['จับคู่ Coach ตามความต้องการ','จัดกลุ่ม PLC ข้ามจังหวัด','แจ้งเตือนนัดหมายและงานค้าง'],data:'Need → Match → Coaching log'},
  {no:'04',type:'INNOVATION STUDIO',title:'ห้องทดลองและพัฒนานวัตกรรม',desc:'พื้นที่ลงมือสร้าง ทดลอง และปรับปรุงนวัตกรรมจากโจทย์จริง พร้อมบันทึกสิ่งที่เรียนรู้ทุกครั้ง',list:['เครื่องมือออกแบบและต้นแบบ','กิจกรรมพัฒนาสมรรถนะ','เก็บผลทดลองและ Reflection'],data:'Prototype → Test → Reflection'},
  {no:'05',type:'SHOW & SHARE',title:'เวทีแลกเปลี่ยนและขยายผล',desc:'นำเสนอผลงานที่ผ่านเกณฑ์ เชื่อมเครือข่ายระดับจังหวัดและระดับภาค พร้อมเก็บข้อเสนอแนะกลับเข้าระบบ',list:['เวที On-site และ Online','คลังผลงานค้นหาได้','คัดเลือกต้นแบบเพื่อขยายผล'],data:'Showcase → Review → Amplify'},
  {no:'06',type:'MONITORING CENTER',title:'ศูนย์ติดตามผลและคลังความรู้',desc:'ผู้บริหารเห็นความก้าวหน้า อุปสรรค การใช้ทรัพยากร และผลลัพธ์เชิงประจักษ์ เพื่อสั่งการได้ตรงจุด',list:['Dashboard รายบุคคล–จังหวัด–ภาค','สัญญาณเตือนทีมที่ต้องช่วยเหลือ','รายงานและข้อเสนอเชิงนโยบาย'],data:'Data → Signal → Decision'}
];
const hotspots=[...document.querySelectorAll('.hotspot')];
function showZone(i){const z=zones[i];hotspots.forEach((h,n)=>h.classList.toggle('active',n===i));['zoneNo','zoneType','zoneTitle','zoneDesc','zoneData'].forEach(id=>document.getElementById(id).textContent=z[id.replace('zone','').toLowerCase()]||'');document.getElementById('zoneList').innerHTML=z.list.map(x=>`<li>${x}</li>`).join('')}
hotspots.forEach((h,i)=>h.addEventListener('click',()=>showZone(i)));
document.getElementById('tourBtn').addEventListener('click',async()=>{for(let i=0;i<zones.length;i++){showZone(i);await new Promise(r=>setTimeout(r,1100))}});
document.querySelectorAll('.decision button').forEach(btn=>btn.addEventListener('click',()=>{btn.textContent='เปิดรายการแล้ว';btn.style.color='#008c73'}));
const sourceInfo=[
  ['ผู้ยืนยันตัวตน 245 คน','ระบบลงทะเบียน LCF10 → ตรวจรหัสผู้เข้าร่วม → ตัดรายการซ้ำ → นับเฉพาะผู้ยืนยันสำเร็จ'],
  ['ผู้ตอบแบบประเมิน 155 คน','แบบประเมินหลังงาน → เชื่อมกับรหัสผู้เข้าร่วม → ตรวจความครบถ้วน → คิดอัตราตอบกลับ 155 ÷ 245'],
  ['ความพึงพอใจเฉลี่ย 4.63','คำถามมาตรประมาณค่า 5 ระดับจากผู้ตอบ 155 คน → รวมคะแนน → หารจำนวนคำตอบที่สมบูรณ์'],
  ['พร้อมเข้าร่วมครั้งต่อไป 94.8%','คำถามความตั้งใจเข้าร่วมครั้งต่อไปจากแบบประเมิน → นับคำตอบเชิงบวก → คิดเป็นร้อยละของผู้ตอบ']
];
const sourcePop=document.getElementById('sourcePop');
document.querySelectorAll('.source-tag').forEach((btn,i)=>btn.addEventListener('click',()=>{document.getElementById('sourceTitle').textContent=sourceInfo[i][0];document.getElementById('sourceDetail').textContent=sourceInfo[i][1];sourcePop.classList.add('show')}));
sourcePop.querySelector('button').addEventListener('click',()=>sourcePop.classList.remove('show'));

const evolutionStages=[...document.querySelectorAll('.evo-stage')];
evolutionStages.forEach((stage,i)=>stage.addEventListener('click',()=>evolutionStages.forEach((s,n)=>s.classList.toggle('focus',n===i))));
document.getElementById('playEvolution').addEventListener('click',async()=>{
  const btn=document.getElementById('playEvolution');btn.textContent='กำลังเล่าเส้นทาง...';
  for(let i=0;i<evolutionStages.length;i++){evolutionStages.forEach((s,n)=>s.classList.toggle('focus',n===i));await new Promise(r=>setTimeout(r,1250))}
  btn.textContent='↻ เล่นอีกครั้ง';
});
