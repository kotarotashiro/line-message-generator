document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    const eventForm = document.getElementById('eventForm');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step1Indicator = document.getElementById('step1Indicator');
    const step2Indicator = document.getElementById('step2Indicator');
    const step3Indicator = document.getElementById('step3Indicator');
    const nextToStep2 = document.getElementById('nextToStep2');
    const backToStep1 = document.getElementById('backToStep1');
    const nextToStep3 = document.getElementById('nextToStep3');
    const backToStep2 = document.getElementById('backToStep2');
    const generateButton = document.getElementById('generateButton');
    const resultSection = document.getElementById('resultSection');
    const newEventButton = document.getElementById('newEventButton');
    
    // テンプレートデータ
    const templates = {
        maya: {
            title: 'マヤ暦セミナー',
            time: '13:00〜15:00',
            location: 'シンクロカフェ',
            price: '5,000円',
            capacity: '8名限定',
            description: 'マヤ暦から読み解くあなたの才能と使命\n\n古代マヤ文明に伝わる叡智「マヤ暦」を通して、あなたの本質的な才能や人生の目的を紐解いていきます。\n\n生年月日から導き出される「KIN」を元に、あなただけの特別なエネルギーと可能性を発見しましょう。',
            benefit: '✨ このセミナーで得られること ✨\n\n・自分の才能や強みを客観的に知ることができる\n・人間関係の悩みが解消される視点を得られる\n・人生の転機や波を味方につける方法がわかる\n・自分らしく生きるためのヒントが見つかる'
        },
        yoga: {
            title: 'ヨガクラス',
            time: '10:00〜12:00',
            location: '代々木公園',
            price: '3,000円',
            capacity: '5名限定',
            description: '自然の中で心と体を整えるヨガ\n\n緑豊かな環境の中で行うヨガは、都会の喧騒を忘れ、自然のエネルギーを感じながら心身をリセットする特別な時間です。\n\n呼吸と動きを調和させながら、日常のストレスを解放し、内側から輝く自分を取り戻しましょう。',
            benefit: '✨ このクラスで得られること ✨\n\n・心身のバランスを整える\n・自然の中でリフレッシュできる\n・日常のストレスから解放される\n・呼吸法を通して自己調整力を高める'
        },
        session: {
            title: '個人セッション',
            time: '14:00〜16:00',
            location: 'オンライン（Zoom）',
            price: '10,000円',
            capacity: '',
            description: 'あなただけのための特別なセッション\n\nマヤ暦とヒーリングを組み合わせた個人セッションで、あなたの人生の流れを読み解き、潜在的な可能性を引き出します。\n\n現在抱えている悩みや課題に対して、宇宙の法則に基づいたアドバイスと具体的な解決策をお伝えします。',
            benefit: '✨ このセッションで得られること ✨\n\n・現在の状況を客観的に理解できる\n・自分の本質と向き合うきっかけを得られる\n・具体的な行動計画が見えてくる\n・エネルギーの流れを整え、前向きな気持ちになれる'
        },
        salon: {
            title: 'シンクロサロン',
            time: '19:00〜21:00',
            location: 'シンクロカフェ',
            price: '3,000円',
            capacity: '10名限定',
            description: '不思議なシンクロニシティを体験する夜\n\n同じ波動を持つ仲間が集まり、日常では気づけない「偶然の一致」の意味を探ります。\n\n参加者同士のシェアを通して、宇宙からのメッセージを受け取り、人生の次のステップへのヒントを見つけましょう。',
            benefit: '✨ このサロンで得られること ✨\n\n・新しい気づきや視点を得られる\n・共鳴する仲間との出会い\n・シンクロニシティの意味を理解できる\n・自分の直感力を高めるヒント'
        },
        workshop: {
            title: 'ワークショップ',
            time: '13:00〜15:00',
            location: '渋谷カルチャーセンター',
            price: '7,000円',
            capacity: '8名限定',
            description: '実践的なワークで自己変容を体験\n\nグループワークとシェアリングを通して、自分自身の内側にある答えを見つけていきます。\n\n理論だけでなく、体験を通して学ぶことで、日常生活にすぐに活かせるスキルを身につけることができます。',
            benefit: '✨ このワークショップで得られること ✨\n\n・実践的なスキルが身につく\n・グループの相乗効果で気づきが深まる\n・自分の思考パターンを客観視できる\n・新しい自分との出会い'
        },
        online: {
            title: 'オンラインイベント',
            time: '19:00〜21:00',
            location: 'オンライン（Zoom）',
            price: '3,000円',
            capacity: '',
            description: '場所を選ばず参加できる特別な時間\n\n自宅にいながら、質の高い学びと体験ができるオンラインイベントです。\n\nチャット機能を活用した質疑応答や、少人数のブレイクアウトルームでのディスカッションなど、双方向のコミュニケーションを大切にしています。',
            benefit: '✨ このイベントで得られること ✨\n\n・移動時間なく自宅から参加できる\n・録画視聴で復習も可能\n・全国各地の参加者との交流\n・オンラインならではの集中した学び'
        },
        custom: {
            title: '',
            time: '',
            location: '',
            price: '',
            capacity: '',
            description: '',
            benefit: ''
        }
    };
    
    // テンプレートカードのイベントリスナー設定
    const templateCards = document.querySelectorAll('.template-card');
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            // 選択状態のリセット
            templateCards.forEach(c => c.classList.remove('selected'));
            // クリックされたカードを選択状態に
            this.classList.add('selected');
            
            const templateType = this.getAttribute('data-template');
            
            // カスタムの場合は入力フィールドを表示
            if (templateType === 'custom') {
                document.getElementById('customEventTypeGroup').classList.remove('hidden');
            } else {
                document.getElementById('customEventTypeGroup').classList.add('hidden');
                // テンプレートデータをグローバル変数に保存
                window.selectedTemplate = templates[templateType];
            }
        });
    });
    
    // ステップ1から2への移動
    nextToStep2.addEventListener('click', function() {
        // 選択されたテンプレートがあるか確認
        const selectedCard = document.querySelector('.template-card.selected');
        if (!selectedCard) {
            alert('イベントタイプを選択してください');
            return;
        }
        
        const templateType = selectedCard.getAttribute('data-template');
        
        // カスタムの場合は入力値をチェック
        if (templateType === 'custom') {
            const eventType = document.getElementById('eventType').value;
            if (!eventType) {
                alert('イベントの種類を入力してください');
                return;
            }
            // カスタムテンプレートを作成
            window.selectedTemplate = {
                title: eventType,
                time: '',
                location: '',
                price: '',
                capacity: '',
                description: '',
                benefit: ''
            };
        }
        
        // ステップ2に移動
        step1.classList.remove('active');
        step2.classList.add('active');
        step1Indicator.classList.remove('active');
        step1Indicator.classList.add('completed');
        step2Indicator.classList.add('active');
        
        // テンプレートデータを入力フィールドに設定
        if (window.selectedTemplate) {
            // 日付は今日から1週間後をデフォルト値に
            const defaultDate = new Date();
            defaultDate.setDate(defaultDate.getDate() + 7);
            const formattedDate = defaultDate.toISOString().split('T')[0];
            
            document.getElementById('eventDate').value = formattedDate;
            
            // その他のフィールドにテンプレート値を設定
            if (window.selectedTemplate.time) {
                const timeSelect = document.getElementById('eventTime');
                const timeOptions = Array.from(timeSelect.options);
                const matchingOption = timeOptions.find(option => option.value === window.selectedTemplate.time);
                
                if (matchingOption) {
                    timeSelect.value = window.selectedTemplate.time;
                } else {
                    timeSelect.value = 'その他';
                    document.getElementById('customEventTime').classList.remove('hidden');
                    document.getElementById('customEventTime').value = window.selectedTemplate.time;
                }
            }
            
            if (window.selectedTemplate.location) {
                const locationSelect = document.getElementById('eventLocation');
                const locationOptions = Array.from(locationSelect.options);
                const matchingOption = locationOptions.find(option => option.value === window.selectedTemplate.location);
                
                if (matchingOption) {
                    locationSelect.value = window.selectedTemplate.location;
                } else {
                    locationSelect.value = 'その他';
                    document.getElementById('customEventLocation').classList.remove('hidden');
                    document.getElementById('customEventLocation').value = window.selectedTemplate.location;
                }
            }
            
            if (window.selectedTemplate.price) {
                const priceSelect = document.getElementById('eventPrice');
                const priceOptions = Array.from(priceSelect.options);
                const matchingOption = priceOptions.find(option => option.value === window.selectedTemplate.price);
                
                if (matchingOption) {
                    priceSelect.value = window.selectedTemplate.price;
                } else {
                    priceSelect.value = 'その他';
                    document.getElementById('customEventPrice').classList.remove('hidden');
                    document.getElementById('customEventPrice').value = window.selectedTemplate.price;
                }
            }
            
            if (window.selectedTemplate.capacity) {
                const capacitySelect = document.getElementById('eventCapacity');
                const capacityOptions = Array.from(capacitySelect.options);
                const matchingOption = capacityOptions.find(option => option.value === window.selectedTemplate.capacity);
                
                if (matchingOption) {
                    capacitySelect.value = window.selectedTemplate.capacity;
                } else if (window.selectedTemplate.capacity) {
                    capacitySelect.value = 'その他';
                    document.getElementById('customEventCapacity').classList.remove('hidden');
                    document.getElementById('customEventCapacity').value = window.selectedTemplate.capacity;
                }
            }
            
            document.getElementById('eventDescription').value = window.selectedTemplate.description;
            document.getElementById('eventBenefit').value = window.selectedTemplate.benefit;
        }
    });

    // ステップ2から1への移動
    backToStep1.addEventListener('click', function() {
        step2.classList.remove('active');
        step1.classList.add('active');
        step2Indicator.classList.remove('active');
        step1Indicator.classList.remove('completed');
        step1Indicator.classList.add('active');
    });
    
    // ステップ2から3への移動
    nextToStep3.addEventListener('click', function() {
        // 必須項目のバリデーション
        const eventDate = document.getElementById('eventDate').value;
        const eventTime = getEventTime();
        const eventLocation = getEventLocation();
        const eventPrice = getEventPrice();
        const eventDescription = document.getElementById('eventDescription').value;
        
        if (!eventDate || !eventTime || !eventLocation || !eventPrice || !eventDescription) {
            alert('必須項目を入力してください');
            return;
        }
        
        // ステップ3に移動
        step2.classList.remove('active');
        step3.classList.add('active');
        step2Indicator.classList.remove('active');
        step2Indicator.classList.add('completed');
        step3Indicator.classList.add('active');
        
        // 確認画面に値を表示
        const eventType = window.selectedTemplate.title;
        const eventCapacity = getEventCapacity();
        const eventBenefit = document.getElementById('eventBenefit').value;
        const applicationUrl = document.getElementById('applicationUrl').value;
        
        document.getElementById('summaryEventType').textContent = eventType;
        document.getElementById('summaryEventDate').textContent = formatDate(eventDate);
        document.getElementById('summaryEventTime').textContent = eventTime;
        document.getElementById('summaryEventLocation').textContent = eventLocation;
        document.getElementById('summaryEventPrice').textContent = eventPrice;
        document.getElementById('summaryEventCapacity').textContent = eventCapacity || '指定なし';
        document.getElementById('summaryEventDescription').textContent = eventDescription;
        document.getElementById('summaryEventBenefit').textContent = eventBenefit || '指定なし';
        document.getElementById('summaryApplicationUrl').textContent = applicationUrl || '指定なし';
    });
    
    // ステップ3から2への移動
    backToStep2.addEventListener('click', function() {
        step3.classList.remove('active');
        step2.classList.add('active');
        step3Indicator.classList.remove('active');
        step2Indicator.classList.remove('completed');
        step2Indicator.classList.add('active');
    });
    
    // 告知文生成
    generateButton.addEventListener('click', function() {
        // 入力値の取得
        const eventType = window.selectedTemplate.title;
        const eventDate = document.getElementById('eventDate').value;
        const formattedDate = formatDate(eventDate);
        const dayOfWeek = getDayOfWeek(new Date(eventDate));
        const eventTime = getEventTime();
        const eventLocation = getEventLocation();
        const eventPrice = getEventPrice();
        const eventCapacity = getEventCapacity();
        const eventDescription = document.getElementById('eventDescription').value;
        const eventBenefit = document.getElementById('eventBenefit').value;
        const applicationUrl = document.getElementById('applicationUrl').value;
        
        console.log('生成ボタンがクリックされました');
        console.log('イベントタイプ:', eventType);
        console.log('日付:', formattedDate);
        console.log('曜日:', dayOfWeek);
        
        try {
            // 告知文の生成
            generateMessages(
                eventType,
                eventDate,
                dayOfWeek,
                eventTime,
                eventLocation,
                eventPrice,
                eventCapacity,
                eventDescription,
                eventBenefit,
                applicationUrl
            );
            
            // 結果セクションの表示
            resultSection.classList.remove('hidden');
            resultSection.classList.add('fade-in');
            
            // 入力セクションを非表示
            document.getElementById('inputSection').classList.add('hidden');
            
            // ページトップにスクロール
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('告知文生成中にエラーが発生しました:', error);
            alert('告知文の生成中にエラーが発生しました。もう一度お試しください。');
        }
    });
    
    // 新しいイベント作成
    newEventButton.addEventListener('click', function() {
        // フォームのリセット
        eventForm.reset();
        
        // 選択状態のリセット
        templateCards.forEach(card => card.classList.remove('selected'));
        
        // カスタム入力フィールドを非表示
        document.getElementById('customEventTypeGroup').classList.add('hidden');
        document.getElementById('customEventTime').classList.add('hidden');
        document.getElementById('customEventLocation').classList.add('hidden');
        document.getElementById('customEventPrice').classList.add('hidden');
        document.getElementById('customEventCapacity').classList.add('hidden');
        
        // ステップ1に戻る
        step1.classList.add('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
        step1Indicator.classList.add('active');
        step1Indicator.classList.remove('completed');
        step2Indicator.classList.remove('active');
        step2Indicator.classList.remove('completed');
        step3Indicator.classList.remove('active');
        
        // 結果セクションを非表示
        resultSection.classList.add('hidden');
        
        // 入力セクションを表示
        document.getElementById('inputSection').classList.remove('hidden');
    });
    
    // タブ切り替え
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // タブボタンのアクティブ状態を切り替え
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // タブコンテンツの表示切り替え
            const tabId = this.getAttribute('data-tab');
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // コピーボタン
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const messageId = this.getAttribute('data-message');
            const messageText = document.getElementById(messageId).innerText;
            
            // クリップボードにコピー
            navigator.clipboard.writeText(messageText).then(() => {
                // コピー成功時の表示
                const originalText = this.textContent;
                this.textContent = 'コピーしました！';
                this.style.backgroundColor = '#4CAF50';
                this.style.color = 'white';
                
                // 元に戻す
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }, 2000);
            });
        });
    });
    
    // カスタム入力フィールドの表示/非表示
    document.getElementById('eventTime').addEventListener('change', function() {
        if (this.value === 'その他') {
            document.getElementById('customEventTime').classList.remove('hidden');
        } else {
            document.getElementById('customEventTime').classList.add('hidden');
        }
    });
    
    document.getElementById('eventLocation').addEventListener('change', function() {
        if (this.value === 'その他') {
            document.getElementById('customEventLocation').classList.remove('hidden');
        } else {
            document.getElementById('customEventLocation').classList.add('hidden');
        }
    });
    
    document.getElementById('eventPrice').addEventListener('change', function() {
        if (this.value === 'その他') {
            document.getElementById('customEventPrice').classList.remove('hidden');
        } else {
            document.getElementById('customEventPrice').classList.add('hidden');
        }
    });
    
    document.getElementById('eventCapacity').addEventListener('change', function() {
        if (this.value === 'その他') {
            document.getElementById('customEventCapacity').classList.remove('hidden');
        } else {
            document.getElementById('customEventCapacity').classList.add('hidden');
        }
    });
    
    // ヘルパー関数
    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
    
    function getDayOfWeek(date) {
        const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
        return dayOfWeek[date.getDay()];
    }
    
    function getEventTime() {
        const eventTime = document.getElementById('eventTime').value;
        if (eventTime === 'その他') {
            return document.getElementById('customEventTime').value;
        }
        return eventTime;
    }
    
    function getEventLocation() {
        const eventLocation = document.getElementById('eventLocation').value;
        if (eventLocation === 'その他') {
            return document.getElementById('customEventLocation').value;
        }
        return eventLocation;
    }
    
    function getEventPrice() {
        const eventPrice = document.getElementById('eventPrice').value;
        if (eventPrice === 'その他') {
            return document.getElementById('customEventPrice').value;
        }
        return eventPrice;
    }
    
    function getEventCapacity() {
        const eventCapacity = document.getElementById('eventCapacity').value;
        if (eventCapacity === 'その他') {
            return document.getElementById('customEventCapacity').value;
        }
        return eventCapacity;
    }
    
    // 絵文字ランダム選択関数
    function getRandomEmoji(category) {
        const emojiMap = {
            happy: ['😃', '😊', '😄', '😁', '😀', '🥰'],
            excited: ['✨', '🎉', '🌟', '💫', '🔆', '⭐'],
            grateful: ['🙏', '💖', '💕', '💓', '💝'],
            nature: ['🌸', '🌿', '🍀', '🌱', '🌺', '🌷'],
            star: ['⭐', '✨', '💫', '🌟', '☀️', '✴️'],
            info: ['💡', '📝', '📌', '🔍', '📢'],
            time: ['⏰', '⌛', '🕒', '📅', '🗓️']
        };
        
        const emojis = emojiMap[category] || emojiMap.happy;
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    // 金子あさみさんの文章スタイルに基づいた挨拶文
    function getGreeting() {
        const hour = new Date().getHours();
        const greetings = [];
        
        if (hour >= 5 && hour < 12) {
            greetings.push(
                `おはようございます${getRandomEmoji('happy')}`,
                `素敵な朝をお迎えですか${getRandomEmoji('happy')}`,
                `朝から元気に過ごしていますか${getRandomEmoji('nature')}`
            );
        } else if (hour >= 12 && hour < 18) {
            greetings.push(
                `こんにちは${getRandomEmoji('happy')}`,
                `素敵な午後をお過ごしですか${getRandomEmoji('happy')}`,
                `今日も素敵な1日をお過ごしですか${getRandomEmoji('nature')}`
            );
        } else {
            greetings.push(
                `こんばんは${getRandomEmoji('happy')}`,
                `素敵な夜をお過ごしですか${getRandomEmoji('star')}`,
                `今日も1日お疲れさまでした${getRandomEmoji('grateful')}`
            );
        }
        
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // 金子あさみスタイルの自己紹介
    function getSelfIntro() {
        const intros = [
            `金子あさみです${getRandomEmoji('happy')}`,
            `金子あさみです${getRandomEmoji('grateful')}`,
            `金子あさみです${getRandomEmoji('star')}`
        ];
        return intros[Math.floor(Math.random() * intros.length)];
    }
    
    // 近況共有のバリエーション
    function getRecentActivity() {
        const activities = [
            `今朝は早起きして瞑想をしました。\n心が穏やかになって、素晴らしいアイデアが浮かびました${getRandomEmoji('star')}`,
            `今日もヨガをしました。\n体が喜んでいます${getRandomEmoji('nature')}\n皆さんも是非体を動かしてみてくださいね。`,
            `今日は不思議なシンクロがありました${getRandomEmoji('star')}\n宇宙からのメッセージを感じています。`,
            `最近、マヤ暦の学びを深めています${getRandomEmoji('excited')}\nますます魅力を感じています。`,
            `今日は朝から自然の中で過ごしました${getRandomEmoji('nature')}\n心も体も喜んでいます。`
        ];
        return activities[Math.floor(Math.random() * activities.length)];
    }
    
    // 締めくくりのバリエーション
    function getClosing() {
        const closings = [
            `素敵な出会いと気づきの場になりますように${getRandomEmoji('star')}`,
            `皆さまにお会いできることを楽しみにしています${getRandomEmoji('happy')}`,
            `あなたの人生が輝くきっかけになりますように${getRandomEmoji('star')}`,
            `素敵な1日をお過ごしください${getRandomEmoji('happy')}`,
            `魂レベルで成長できる時間になりますように${getRandomEmoji('star')}${getRandomEmoji('star')}`
        ];
        return closings[Math.floor(Math.random() * closings.length)];
    }
    
    // 行動喚起のバリエーション
    function getCallToAction() {
        const ctas = [
            `ぜひ一緒に素敵な時間を過ごしましょう${getRandomEmoji('excited')}`,
            `この機会をお見逃しなく${getRandomEmoji('info')}${getRandomEmoji('info')}`,
            `ご参加いただければ嬉しいです${getRandomEmoji('grateful')}`,
            `お申し込みはお早めに${getRandomEmoji('time')}`,
            `一緒に素敵な体験をしましょう${getRandomEmoji('excited')}`
        ];
        return ctas[Math.floor(Math.random() * ctas.length)];
    }
    
    // 希少性を演出する表現
    function getScarcityPhrase() {
        const phrases = [
            `残席わずかです${getRandomEmoji('info')}`,
            `残席3名様のみ${getRandomEmoji('info')}`,
            `今回限りの特別価格です${getRandomEmoji('excited')}`,
            `期間限定のスペシャルオファー${getRandomEmoji('star')}`,
            `先着${Math.floor(Math.random() * 5) + 3}名様限定${getRandomEmoji('info')}`
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }
    
    // 体験価値を強調する表現
    function getValueProposition() {
        const valueProps = [
            `このセミナーを通じて、あなたの本来の才能に気づき、人生が大きく変わるきっかけになります${getRandomEmoji('star')}`,
            `参加者の方からは「自分の可能性に気づけた」「人生の方向性が見えた」という声をいただいています${getRandomEmoji('happy')}`,
            `たった数時間で、今までの人生観が変わる体験をしていただけます${getRandomEmoji('excited')}`,
            `あなたの中に眠る無限の可能性を引き出すお手伝いをさせていただきます${getRandomEmoji('star')}`,
            `日常から離れて、自分自身と向き合う貴重な時間になります${getRandomEmoji('grateful')}`
        ];
        return valueProps[Math.floor(Math.random() * valueProps.length)];
    }
    
    // 装飾記号の生成
    function getDecorationSymbol() {
        const symbols = [
            ['✧', '✧'],
            ['♡', '♡'],
            ['☆彡', '☆彡'],
            ['❁', '❁'],
            ['✿', '✿'],
            ['❀', '❀'],
            ['⋆', '⋆'],
            ['✼', '✼']
        ];
        return symbols[Math.floor(Math.random() * symbols.length)];
    }
    
    // 告知文生成関数
    function generateMessages(
        eventType,
        eventDate,
        dayOfWeek,
        eventTime,
        eventLocation,
        eventPrice,
        eventCapacity,
        eventDescription,
        eventBenefit,
        applicationUrl
    ) {
        console.log('generateMessages関数が呼び出されました');
        console.log('パラメータ:', {
            eventType, eventDate, dayOfWeek, eventTime, eventLocation,
            eventPrice, eventCapacity, eventDescription, eventBenefit, applicationUrl
        });
        
        try {
            // 各告知文の日付を設定
            for (let i = 1; i <= 5; i++) {
                const dateElement = document.getElementById(`date${i}`);
                if (dateElement) {
                    const date = new Date(eventDate);
                    dateElement.textContent = `${date.getMonth() + 1}月${date.getDate()}日 (${getDayOfWeek(date)})`;
                }
            }
            
            // 日付のフォーマット
            const formattedDate = formatDate(eventDate);
            
            // メッセージ1（詳細情報）
            const message1 = `
${getGreeting()}

${getSelfIntro()}

${getRecentActivity()}

${getDecorationSymbol()[0]}${eventType}開催のお知らせ${getDecorationSymbol()[1]}

${formattedDate}(${dayOfWeek}) ${eventTime}
場所：${eventLocation}
料金：${eventPrice}
${eventCapacity ? `定員：${eventCapacity}` : ''}

${eventDescription}

${eventBenefit}

${getCallToAction()}
${applicationUrl ? `お申し込みはこちら↓\n${applicationUrl}` : ''}

${getClosing()}
`;

            // メッセージ2（シンプル告知）
            const message2 = `
${getGreeting()}

${getSelfIntro()}

${getDecorationSymbol()[0]}${eventType}を開催します${getDecorationSymbol()[1]}

日時：${formattedDate}(${dayOfWeek}) ${eventTime}
場所：${eventLocation}
料金：${eventPrice}
${eventCapacity ? `定員：${eventCapacity}` : ''}

${eventDescription.split('\n\n')[0]}

${getCallToAction()}
${applicationUrl ? `お申し込み：${applicationUrl}` : ''}

${getClosing()}
`;

            // メッセージ3（希少性強調）
            const message3 = `
${getGreeting()}

${getSelfIntro()}

${getScarcityPhrase()}

${formattedDate}(${dayOfWeek}) ${eventTime}
場所：${eventLocation}
料金：${eventPrice}
${eventCapacity ? `定員：${eventCapacity}` : ''}

${eventType}で、${eventDescription.split('\n\n')[0].toLowerCase()}

${getCallToAction()}
${applicationUrl ? `お申し込みはこちらから↓\n${applicationUrl}` : ''}

${getClosing()}
`;

            // メッセージ4（体験価値強調）
            const message4 = `
${getGreeting()}

${getSelfIntro()}

${getValueProposition()}

日時：${formattedDate}(${dayOfWeek}) ${eventTime}
場所：${eventLocation}
料金：${eventPrice}
${eventCapacity ? `定員：${eventCapacity}` : ''}

${eventType}にぜひご参加ください${getRandomEmoji('excited')}

${getCallToAction()}
${applicationUrl ? `詳細・お申し込み：${applicationUrl}` : ''}

${getClosing()}
`;

            // メッセージ5（コミュニティ感強調）
            const message5 = `
${getGreeting()}

${getSelfIntro()}

${getDecorationSymbol()[0]}${eventType}${getDecorationSymbol()[1]}
一緒に素敵な時間を過ごしましょう${getRandomEmoji('excited')}

${formattedDate}(${dayOfWeek}) ${eventTime}
場所：${eventLocation}
料金：${eventPrice}
${eventCapacity ? `定員：${eventCapacity}` : ''}

${eventDescription.split('\n\n')[0]}

同じ志を持つ仲間と共に、新しい気づきと成長の場を作りたいと思います${getRandomEmoji('star')}

${getCallToAction()}
${applicationUrl ? `お申し込み：${applicationUrl}` : ''}

${getClosing()}
`;

            // 生成したメッセージをHTMLに反映
            document.getElementById('message1').innerHTML = message1.replace(/\n/g, '<br>');
            document.getElementById('message2').innerHTML = message2.replace(/\n/g, '<br>');
            document.getElementById('message3').innerHTML = message3.replace(/\n/g, '<br>');
            document.getElementById('message4').innerHTML = message4.replace(/\n/g, '<br>');
            document.getElementById('message5').innerHTML = message5.replace(/\n/g, '<br>');
            
            console.log('メッセージが設定されました');
            
            return true;
        } catch (error) {
            console.error('メッセージ生成中にエラーが発生しました:', error);
            return false;
        }
    }
});
