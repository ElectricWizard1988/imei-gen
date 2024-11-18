
document.addEventListener('DOMContentLoaded', function() {

    const generateBtn = document.getElementById('generatebtn');
    const numberInput = document.getElementById('imei-count');
    const textArea = document.getElementById('imei-list');
    
    generateBtn.addEventListener('click', function() {
      const number = numberInput.value;
      const imeiNumbers = generateIMEIs(number);
      textArea.textContent = imeiNumbers.join('\n');
      console.log(imeiNumbers.join('\n'))
    });
    
    function generateIMEI() {
        const rbi = ["01", "10", "30", "33", "35", "44", "45", "49", "50", "51", "52", "53", "54", "86", "91", "98", "99"];
        let imei = [Number(rbi[Math.floor(Math.random() * rbi.length)]), ...Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)), 0, ...Array.from({ length: 5 }, () => Math.floor(Math.random() * 10))];
        const imeiStr = imei.join('');
        const checkDigit = calculateCheckDigit(imeiStr);
        imei[14] = checkDigit;
        return imei.join('');
      }
      
      function calculateCheckDigit(imeiStr) {
        let sum = 0;
        for (let i = 0; i < imeiStr.length; i++) {
          let digit = parseInt(imeiStr[i]);
          if ((imeiStr.length - i) % 2 !== 0) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
          sum += digit;
        }
        return (10 - (sum % 10)) % 10;
      }
      
      function isValidIMEI(imei) {
        let sum = 0;
        for (let i = 0; i < imei.length - 1; i++) {
          let digit = parseInt(imei[i]);
          if ((i + 1) % 2 === 0) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
          sum += digit;
        }
        const checkDigit = parseInt(imei[imei.length - 1]);
        return (10 - (sum % 10)) % 10 === checkDigit;
      }
      
      function generateIMEIs(num) {
        const imeis = [];
        for (let i = 0; i < num; i++) {
          let imei = generateIMEI();
          while (!isValidIMEI(imei)) {
            imei = generateIMEI();
          }
          imeis.push(imei);
        }
        console.log(imeis);
        return imeis;
      }

    const copybtn = document.getElementById("copybtn")

    copybtn.addEventListener('click', function() {
        var textToCopy = document.getElementById("imei-list").value;
        navigator.clipboard.writeText(textToCopy);
        alert('Copied to clipboard!')
      });
  });

