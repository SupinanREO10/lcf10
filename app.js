const navButtons=[...document.querySelectorAll('.nav-btn')];
const views=[...document.querySelectorAll('.view')];
navButtons.forEach(btn=>btn.addEventListener('click',()=>{
  navButtons.forEach(b=>b.classList.toggle('active',b===btn));
  views.forEach(v=>v.classList.toggle('active',v.id===btn.dataset.view));
  if(window.matchMedia('(max-width:700px)').matches)btn.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
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
  {no:'01',letter:'S',spiral:'SURVEY · สำรวจ',color:'#43e6ff',type:'WELCOME & MAPPING',title:'จุดรับเข้าและสำรวจความพร้อม',desc:'ยืนยันตัวตน ลงทะเบียน และเก็บข้อมูลความต้องการครั้งเดียว ระบบสร้างโปรไฟล์และเส้นทางพัฒนาให้ทันที',list:['เช็กอินผ่าน QR / Line OA','Mapping ปัญหาและศักยภาพ','ส่งต่อทีมและทรัพยากรอัตโนมัติ'],data:'Profile → Dashboard → Coach'},
  {no:'02',letter:'P',spiral:'PLAN · วางแผน',color:'#987dff',type:'DIGITAL PLATFORM',title:'แพลตฟอร์มและ Portfolio',desc:'พื้นที่ทำงานดิจิทัลของครูและทีมพัฒนา เก็บเป้าหมาย แผนงาน ผลงาน และหลักฐานไว้ในที่เดียว',list:['แฟ้มสะสมงานรายบุคคลและรายทีม','บันทึกหลักฐานจากกิจกรรม','ติดตามความก้าวหน้าแบบเป็นรอบ'],data:'Portfolio → Evidence → Progress'},
  {no:'03',letter:'I',spiral:'IMPLEMENT · ลงมือ',color:'#42dff4',type:'COACHING & PLC',title:'วง Coaching และชุมชนเรียนรู้',desc:'ระบบจับคู่คนที่มีโจทย์กับผู้เชี่ยวชาญ นัดหมาย ติดตามข้อเสนอแนะ และไม่ปล่อยให้ทีมหลุดจากกระบวนการ',list:['จับคู่ Coach ตามความต้องการ','จัดกลุ่ม PLC ข้ามจังหวัด','แจ้งเตือนนัดหมายและงานค้าง'],data:'Need → Match → Coaching log'},
  {no:'04',letter:'R',spiral:'REFLECT · สะท้อน',color:'#30e1ad',type:'INNOVATION STUDIO',title:'ห้องทดลองและพัฒนานวัตกรรม',desc:'พื้นที่ลงมือสร้าง ทดลอง และปรับปรุงนวัตกรรมจากโจทย์จริง พร้อมบันทึกสิ่งที่เรียนรู้ทุกครั้ง',list:['เครื่องมือออกแบบและต้นแบบ','กิจกรรมพัฒนาสมรรถนะ','เก็บผลทดลองและ Reflection'],data:'Prototype → Test → Reflection'},
  {no:'05',letter:'A',spiral:'AMPLIFY · ขยายผล',color:'#ffd65a',type:'SHOW & SHARE',title:'เวทีแลกเปลี่ยนและขยายผล',desc:'นำเสนอผลงานที่ผ่านเกณฑ์ เชื่อมเครือข่ายระดับจังหวัดและระดับภาค พร้อมเก็บข้อเสนอแนะกลับเข้าระบบ',list:['เวที On-site และ Online','คลังผลงานค้นหาได้','คัดเลือกต้นแบบเพื่อขยายผล'],data:'Showcase → Review → Amplify'},
  {no:'06',letter:'L',spiral:'LEARN · เรียนรู้ต่อ',color:'#ff85cc',type:'MONITORING CENTER',title:'ศูนย์ติดตามผลและคลังความรู้',desc:'ผู้บริหารเห็นความก้าวหน้า อุปสรรค การใช้ทรัพยากร และผลลัพธ์เชิงประจักษ์ เพื่อสั่งการได้ตรงจุด',list:['Dashboard รายบุคคล–จังหวัด–ภาค','สัญญาณเตือนทีมที่ต้องช่วยเหลือ','รายงานและข้อเสนอเชิงนโยบาย'],data:'Data → Signal → Decision'}
];
const hotspots=[...document.querySelectorAll('.hotspot')];
const journeyPoints=[...document.querySelectorAll('.journey-point')];
let currentZone=0;
function showZone(i){const z=zones[i];currentZone=i;hotspots.forEach((h,n)=>h.classList.toggle('active',n===i));journeyPoints.forEach((h,n)=>h.classList.toggle('active',n===i));document.getElementById('zoneNo').textContent=z.no;document.getElementById('zoneLetter').textContent=z.letter;document.getElementById('zoneSpiral').textContent=z.spiral;document.getElementById('zoneType').textContent=z.type;document.getElementById('zoneTitle').textContent=z.title;document.getElementById('zoneDesc').textContent=z.desc;document.getElementById('zoneData').textContent=z.data;document.getElementById('zoneList').innerHTML=z.list.map(x=>`<li>${x}</li>`).join('');document.getElementById('spaceHero').style.setProperty('--accent',z.color)}
hotspots.forEach((h,i)=>h.addEventListener('click',()=>showZone(i)));
journeyPoints.forEach((h,i)=>h.addEventListener('click',()=>{showZone(i);document.getElementById('zoneCard').scrollIntoView({behavior:'smooth',block:'center'})}));
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
document.querySelectorAll('.evidence-tab').forEach(tab=>tab.addEventListener('click',()=>{
  document.querySelectorAll('.evidence-tab').forEach(t=>t.classList.toggle('active',t===tab));
  document.querySelectorAll('.evidence-view').forEach(v=>v.classList.toggle('active',v.id===`${tab.dataset.evidence}-evidence`));
}));
document.querySelectorAll('.role-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.role-btn').forEach(b=>b.classList.toggle('active',b===btn));
  document.querySelectorAll('.role-view').forEach(v=>v.classList.toggle('active',v.id===`${btn.dataset.role}-role`));
}));
document.querySelectorAll('.criteria input').forEach(input=>input.addEventListener('input',()=>{
  input.previousElementSibling.textContent=`${input.value}/${input.max}`;
  const total=[...document.querySelectorAll('.criteria input')].reduce((sum,x)=>sum+Number(x.value),0);
  document.querySelector('.score-total strong').innerHTML=`${total}<small>/100</small>`;
}));
document.getElementById('saveScore').addEventListener('click',e=>{e.currentTarget.textContent='✓ บันทึกแล้ว';e.currentTarget.classList.add('saved')});

const rubrics=[
 {title:'นวัตกรรมพลิกโฉม สู่เมืองแห่งการเรียนรู้',measure:'ความริเริ่มแปลกใหม่และการแก้ปัญหาที่ต่างจากเดิม',items:['ความแปลกใหม่ของแนวคิด','การแก้ปัญหาที่เป็นรูปธรรม','หลักฐานการใช้งานจริง','ศักยภาพต่อยอด','การสื่อสารคุณค่าของนวัตกรรม']},
 {title:'อัตลักษณ์ทรงคุณค่า สู่เมืองแห่งการเรียนรู้',measure:'ความลึกของการใช้ภูมิปัญญา อัตลักษณ์ และการมีส่วนร่วมของชุมชน',items:['การใช้ภูมิปัญญา/ทุนวัฒนธรรมท้องถิ่น','ความสอดคล้องกับบริบทของพื้นที่','การมีส่วนร่วมของชุมชน','การธำรงและต่อยอดอัตลักษณ์','คุณค่าต่อความภาคภูมิใจของท้องถิ่น']},
 {title:'ต้นแบบแห่งการต่อยอด สู่เมืองแห่งการเรียนรู้',measure:'ความพร้อมในการส่งต่อและทำซ้ำในบริบทอื่น',items:['ความพร้อมของคู่มือ/ชุดเครื่องมือ','หลักฐานการทำซ้ำ/ปรับใช้','ความคุ้มค่าและทรัพยากร','ความยืดหยุ่นต่อบริบทที่ต่างกัน','ความชัดเจนของเงื่อนไขความสำเร็จ']},
 {title:'พลังผู้เรียนนำวิถี สู่เมืองแห่งการเรียนรู้',measure:'หลักฐานผลลัพธ์ต่อผู้เรียนและการออกแบบที่ยึดผู้เรียนเป็นศูนย์กลาง',items:['หลักฐานผลลัพธ์ต่อผู้เรียน','ความครอบคลุมกลุ่มเป้าหมาย','การออกแบบที่ยึดผู้เรียนเป็นศูนย์กลาง','การตอบสนองความต่าง/ความเสมอภาค','ความต่อเนื่องของผลต่อผู้เรียน']},
 {title:'สานพลังภาคี สู่เมืองแห่งการเรียนรู้',measure:'ความหลากหลายของภาคี บทบาทที่เป็นรูปธรรม และความยั่งยืนของความร่วมมือ',items:['ความหลากหลายของภาคี','บทบาทที่เป็นรูปธรรมของภาคี','ความต่อเนื่องและความยั่งยืน','ผลลัพธ์ร่วมจากเครือข่าย','การขยายและเชื่อมเครือข่ายใหม่']},
 {title:'จุดประกายแรงบันดาลใจ สู่เมืองแห่งการเรียนรู้',measure:'พลังการเป็นแบบอย่างและการจุดประกายจากหลักฐานเชิงประจักษ์',items:['การเป็นแบบอย่างที่จับต้องได้','พลังเรื่องเล่า/การสื่อสาร','การเอาชนะอุปสรรค/ความมานะ','การสร้างแรงกระเพื่อมต่อผู้อื่น','คุณค่าเชิงบันดาลใจที่ยั่งยืน']}
];
const rubricGrid=document.getElementById('rubricGrid');
function showRubric(i){const r=rubrics[i];document.querySelectorAll('.rubric-btn').forEach((b,n)=>b.classList.toggle('active',n===i));document.getElementById('rubricNo').textContent=String(i+1).padStart(2,'0');document.getElementById('rubricTitle').textContent=r.title;document.getElementById('rubricMeasure').textContent='มุ่งวัด: '+r.measure;document.getElementById('rubricCriteria').innerHTML=r.items.map((x,n)=>`<div><small>ตัวชี้วัด ${n+1}</small>${x}</div>`).join('')}
if(rubricGrid){rubricGrid.innerHTML=rubrics.map((r,i)=>`<button class="rubric-btn${i===0?' active':''}" data-rubric="${i}"><span>ประเภทที่ ${i+1}</span><b>${r.title}</b></button>`).join('');rubricGrid.querySelectorAll('.rubric-btn').forEach(b=>b.addEventListener('click',()=>showRubric(Number(b.dataset.rubric))));showRubric(0)}
document.querySelectorAll('.space-role').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.space-role').forEach(b=>b.classList.toggle('active',b===btn));document.querySelectorAll('.space-role-intro').forEach(v=>v.classList.toggle('active',v.id===`${btn.dataset.spaceRole}-space`))}));
const missions=[['จุดรับเข้าและสำรวจความพร้อม','สแกน QR สำรวจความสนใจ และบันทึกโจทย์ที่อยากเรียนรู้','Learning Passport · Badge นักสำรวจ'],['แพลตฟอร์มและ Portfolio','เลือกผลงานหรือองค์ความรู้ที่สนใจ แล้วบันทึกไว้ในแฟ้มของตนเอง','Badge นักเก็บเกี่ยว · รายการความรู้ส่วนตัว'],['วง Coaching และชุมชนเรียนรู้','ร่วมสนทนา แลกเปลี่ยนประสบการณ์ หรือขอคำแนะนำจากภาคี','Badge นักเชื่อมโยง · บันทึกเครือข่าย'],['ห้องทดลองและพัฒนานวัตกรรม','ทดลองใช้แนวคิด สะท้อนผล หรืออัปโหลดหลักฐานการพัฒนา','Badge นักทดลอง · Reflection ใน Portfolio'],['เวทีแลกเปลี่ยนและขยายผล','ผู้เข้าชมกดรับแรงบันดาลใจ ผู้เข้าร่วมเผยแพร่ผลงานเพื่อประเมินคุณภาพ','Badge นักแบ่งปัน · ลิงก์ผลงาน/ผลประเมิน'],['ศูนย์ติดตามผลและคลังความรู้','ทบทวนเส้นทาง ดู Badge และเลือกภารกิจถัดไปสำหรับการพัฒนา','Badge LOOP Finisher · Passport รวมอยู่ใน Portfolio']];
const missionModal=document.getElementById('missionModal');
function showMission(i){const m=missions[i];document.getElementById('missionNo').textContent=String(i+1).padStart(2,'0');document.getElementById('missionTitle').textContent=`ภารกิจที่ ${i+1}`;document.getElementById('missionZone').textContent=m[0];document.getElementById('visitorMission').textContent=m[1];document.getElementById('visitorReward').textContent=m[2];document.getElementById('participantMission').textContent=i===4?'ส่งผลงาน เอกสาร วิดีโอ หรือ Live เพื่อเข้าสู่การประเมินคุณภาพนวัตกรรม':`ร่วมภารกิจ ${m[0]} พร้อมสร้างหลักฐานการพัฒนา`;document.getElementById('participantReward').textContent=i===4?'Badge ผู้พัฒนาจุดที่ 5 · Innovation Portfolio · ผลประเมินคุณภาพ':'Badge ผู้พัฒนาจุดที่ '+(i+1);missionModal.classList.add('show');missionModal.setAttribute('aria-hidden','false')}
document.getElementById('missionOpen').addEventListener('click',()=>showMission(currentZone));document.getElementById('missionClose').addEventListener('click',()=>missionModal.classList.remove('show'));document.getElementById('missionNext').addEventListener('click',()=>{missionModal.classList.remove('show');const n=Number(document.getElementById('missionNo').textContent)-1;if(n<5)setTimeout(()=>{showZone(n+1);showMission(n+1)},350)});



